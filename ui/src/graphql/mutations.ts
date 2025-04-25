import { gql } from "@apollo/client";

export const REDEEM = gql`
  mutation Redeem($rewardId: ID!, $quantity: Int!) {
    redeem(rewardId: $rewardId, quantity: $quantity) {
      id
      quantity
      reward { id name }
      insertedAt
    }
  }
`;

export const ADD_POINTS = gql`
  mutation AddPoints($userId: ID!, $points: Int!) {
    addPoints(userId: $userId, points: $points) {
      id
      balancePoints
    }
  }
`;


export const LOGIN = gql`
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

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $passwordConfirmation: String!) {
    register(email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
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
