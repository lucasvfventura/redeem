import { gql } from "@apollo/client";

export const GET_REWARDS = gql`
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

export const GET_REDEMPTIONS = gql`
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

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      role
      balancePoints
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      id
      email
      role
      balancePoints
    }
  }
`;
