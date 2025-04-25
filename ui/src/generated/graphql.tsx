import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Redeemption = {
  __typename?: 'Redeemption';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
  reward: Reward;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type Reward = {
  __typename?: 'Reward';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  valuePerUnit: Scalars['Int']['output'];
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  addPoints: Maybe<User>;
  createReward: Maybe<Reward>;
  login: Maybe<Session>;
  redeem: Maybe<Redeemption>;
  register: Maybe<Session>;
};


export type RootMutationTypeAddPointsArgs = {
  points: Scalars['Int']['input'];
  userId: Scalars['ID']['input'];
};


export type RootMutationTypeCreateRewardArgs = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  valuePerUnit: Scalars['Int']['input'];
};


export type RootMutationTypeLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type RootMutationTypeRedeemArgs = {
  quantity: Scalars['Int']['input'];
  rewardId: Scalars['ID']['input'];
};


export type RootMutationTypeRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  me: Maybe<User>;
  redemptions: Maybe<Array<Maybe<Redeemption>>>;
  reward: Maybe<Reward>;
  rewards: Maybe<Array<Maybe<Reward>>>;
  users: Maybe<Array<Maybe<User>>>;
};


export type RootQueryTypeRewardArgs = {
  id: Scalars['ID']['input'];
};

export type Session = {
  __typename?: 'Session';
  token: Scalars['String']['output'];
  user: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  balancePoints: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  role: Scalars['String']['output'];
};

export type RedeemMutationVariables = Exact<{
  rewardId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type RedeemMutation = { __typename?: 'RootMutationType', redeem: { __typename?: 'Redeemption', id: string, quantity: number, createdAt: any | null, reward: { __typename?: 'Reward', id: string, name: string } } | null };

export type AddPointsMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  points: Scalars['Int']['input'];
}>;


export type AddPointsMutation = { __typename?: 'RootMutationType', addPoints: { __typename?: 'User', id: string, balancePoints: number } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'RootMutationType', login: { __typename?: 'Session', token: string, user: { __typename?: 'User', id: string, email: string, role: string, balancePoints: number } | null } | null };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'RootMutationType', register: { __typename?: 'Session', token: string, user: { __typename?: 'User', id: string, email: string, role: string, balancePoints: number } | null } | null };

export type GetRewardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRewardsQuery = { __typename?: 'RootQueryType', rewards: Array<{ __typename?: 'Reward', id: string, name: string, description: string, valuePerUnit: number, quantity: number } | null> | null };

export type GetRedemptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRedemptionsQuery = { __typename?: 'RootQueryType', redemptions: Array<{ __typename?: 'Redeemption', id: string, quantity: number, createdAt: any | null, reward: { __typename?: 'Reward', id: string, name: string } } | null> | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'RootQueryType', users: Array<{ __typename?: 'User', id: string, email: string, role: string, balancePoints: number } | null> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'RootQueryType', me: { __typename?: 'User', id: string, email: string, role: string, balancePoints: number } | null };


export const RedeemDocument = gql`
    mutation Redeem($rewardId: ID!, $quantity: Int!) {
  redeem(rewardId: $rewardId, quantity: $quantity) {
    id
    quantity
    reward {
      id
      name
    }
    createdAt
  }
}
    `;
export type RedeemMutationFn = Apollo.MutationFunction<RedeemMutation, RedeemMutationVariables>;

/**
 * __useRedeemMutation__
 *
 * To run a mutation, you first call `useRedeemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRedeemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [redeemMutation, { data, loading, error }] = useRedeemMutation({
 *   variables: {
 *      rewardId: // value for 'rewardId'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useRedeemMutation(baseOptions?: Apollo.MutationHookOptions<RedeemMutation, RedeemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RedeemMutation, RedeemMutationVariables>(RedeemDocument, options);
      }
export type RedeemMutationHookResult = ReturnType<typeof useRedeemMutation>;
export type RedeemMutationResult = Apollo.MutationResult<RedeemMutation>;
export type RedeemMutationOptions = Apollo.BaseMutationOptions<RedeemMutation, RedeemMutationVariables>;
export const AddPointsDocument = gql`
    mutation AddPoints($userId: ID!, $points: Int!) {
  addPoints(userId: $userId, points: $points) {
    id
    balancePoints
  }
}
    `;
export type AddPointsMutationFn = Apollo.MutationFunction<AddPointsMutation, AddPointsMutationVariables>;

/**
 * __useAddPointsMutation__
 *
 * To run a mutation, you first call `useAddPointsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPointsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPointsMutation, { data, loading, error }] = useAddPointsMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      points: // value for 'points'
 *   },
 * });
 */
export function useAddPointsMutation(baseOptions?: Apollo.MutationHookOptions<AddPointsMutation, AddPointsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPointsMutation, AddPointsMutationVariables>(AddPointsDocument, options);
      }
export type AddPointsMutationHookResult = ReturnType<typeof useAddPointsMutation>;
export type AddPointsMutationResult = Apollo.MutationResult<AddPointsMutation>;
export type AddPointsMutationOptions = Apollo.BaseMutationOptions<AddPointsMutation, AddPointsMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      email
      role
      balancePoints
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $passwordConfirmation: String!) {
  register(
    email: $email
    password: $password
    passwordConfirmation: $passwordConfirmation
  ) {
    token
    user {
      id
      email
      role
      balancePoints
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      passwordConfirmation: // value for 'passwordConfirmation'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetRewardsDocument = gql`
    query GetRewards {
  rewards {
    id
    name
    description
    valuePerUnit
    quantity
  }
}
    `;

/**
 * __useGetRewardsQuery__
 *
 * To run a query within a React component, call `useGetRewardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRewardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRewardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRewardsQuery(baseOptions?: Apollo.QueryHookOptions<GetRewardsQuery, GetRewardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRewardsQuery, GetRewardsQueryVariables>(GetRewardsDocument, options);
      }
export function useGetRewardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRewardsQuery, GetRewardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRewardsQuery, GetRewardsQueryVariables>(GetRewardsDocument, options);
        }
export function useGetRewardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRewardsQuery, GetRewardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRewardsQuery, GetRewardsQueryVariables>(GetRewardsDocument, options);
        }
export type GetRewardsQueryHookResult = ReturnType<typeof useGetRewardsQuery>;
export type GetRewardsLazyQueryHookResult = ReturnType<typeof useGetRewardsLazyQuery>;
export type GetRewardsSuspenseQueryHookResult = ReturnType<typeof useGetRewardsSuspenseQuery>;
export type GetRewardsQueryResult = Apollo.QueryResult<GetRewardsQuery, GetRewardsQueryVariables>;
export const GetRedemptionsDocument = gql`
    query GetRedemptions {
  redemptions {
    id
    quantity
    reward {
      id
      name
    }
    createdAt
  }
}
    `;

/**
 * __useGetRedemptionsQuery__
 *
 * To run a query within a React component, call `useGetRedemptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRedemptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRedemptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRedemptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetRedemptionsQuery, GetRedemptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRedemptionsQuery, GetRedemptionsQueryVariables>(GetRedemptionsDocument, options);
      }
export function useGetRedemptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRedemptionsQuery, GetRedemptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRedemptionsQuery, GetRedemptionsQueryVariables>(GetRedemptionsDocument, options);
        }
export function useGetRedemptionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRedemptionsQuery, GetRedemptionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRedemptionsQuery, GetRedemptionsQueryVariables>(GetRedemptionsDocument, options);
        }
export type GetRedemptionsQueryHookResult = ReturnType<typeof useGetRedemptionsQuery>;
export type GetRedemptionsLazyQueryHookResult = ReturnType<typeof useGetRedemptionsLazyQuery>;
export type GetRedemptionsSuspenseQueryHookResult = ReturnType<typeof useGetRedemptionsSuspenseQuery>;
export type GetRedemptionsQueryResult = Apollo.QueryResult<GetRedemptionsQuery, GetRedemptionsQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    email
    role
    balancePoints
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    role
    balancePoints
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;