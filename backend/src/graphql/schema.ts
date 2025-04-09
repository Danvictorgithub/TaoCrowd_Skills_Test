import gql from "graphql-tag";

export const typeDefs = gql`
  scalar DateTime

  enum Status {
    failed
    success
    upcoming
  }

  type Project {
    id: ID!
    title: String!
    description: String!
    status: Status!
    image: String!
    video: String!
    article: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type ProjectsResponse {
    projects: [Project!]!
    nextCursor: String
    hasMore: Boolean!
  }

  type Query {
    projects(cursor: String, limit: Int, search: String): ProjectsResponse!
    project(id: ID!): Project
  }
`;
