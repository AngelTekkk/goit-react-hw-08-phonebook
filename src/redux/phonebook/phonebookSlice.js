import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Notify } from 'notiflix';

export const phonebookApi = createApi({
  reducerPath: 'phonebookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
    prepareHeaders: headers => {
      if (localStorage.getItem('user')) {
        const token = JSON.parse(localStorage.getItem('user'));
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Contacts'],
  endpoints: builder => ({
    getUser: builder.query({
      query: () => {
        return '/users/current';
      },
      providesTags: ['User'],
    }),
    signUpUser: builder.mutation({
      query: ({ name, email, password }) => ({
        url: `/users/signup`,
        method: 'POST',
        body: {
          name,
          email,
          password,
        },
      }),
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('user', JSON.stringify(data.token));
        } catch (err) {
          console.log(err);
          Notify.failure('User with this email may exist already');
        }
      },
      invalidatesTags: result => {
        if (!result) {
          return;
        }
        return ['User'];
      },
    }),
    signInUser: builder.mutation({
      query: ({ email, password }) => ({
        url: '/users/login',
        method: 'POST',
        body: { email, password },
      }),
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('user', JSON.stringify(data.token));
        } catch (err) {
          console.log(err);
          Notify.failure('Email or password doesn`t match');
        }
      },
      invalidatesTags: result => {
        if (!result) {
          return;
        }
        return ['User'];
      },
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
        body: {},
      }),
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          if (await queryFulfilled) {
            localStorage.removeItem('user');
          }
        } catch (err) {
          console.log(err);
        }
      },
      invalidatesTags: ['User'],
    }),
    getContacts: builder.query({
      query: () => '/contacts',
      providesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
    createContact: builder.mutation({
      query: ({ name, number }) => ({
        url: '/contacts',
        method: 'POST',
        body: {
          name,
          number,
        },
      }),
      invalidatesTags: ['Contacts'],
    }),
    editContact: builder.mutation({
      query: ({ id, name, number }) => ({
        url: `/contacts/${id}`,
        method: 'PATCH',
        body: {
          name,
          number,
        },
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useSignUpUserMutation,
  useSignInUserMutation,
  useLogOutUserMutation,
  useGetContactsQuery,
  useDeleteContactMutation,
  useCreateContactMutation,
  useEditContactMutation,
} = phonebookApi;
