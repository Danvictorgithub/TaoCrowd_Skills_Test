import { PrismaClient, Status, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Define types that match the GraphQL schema
interface ProjectGQL {
  id: string;
  title: string;
  description: string;
  status: Status;
  image: string;
  video: string;
  article: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsResponse {
  projects: ProjectGQL[];
  nextCursor: string | null;
  hasMore: boolean;
}

export const resolvers = {
  Query: {
    projects: async (
      _: unknown,
      {
        cursor,
        limit = 10,
        search,
      }: { cursor?: string; limit?: number; search?: string }
    ): Promise<ProjectsResponse> => {
      const where: Prisma.ProjectWhereInput = search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive" as Prisma.QueryMode,
                },
              },
              {
                description: {
                  contains: search,
                  mode: "insensitive" as Prisma.QueryMode,
                },
              },
            ],
          }
        : {};

      const projects = await prisma.project.findMany({
        where,
        take: limit + 1,
        ...(cursor && {
          skip: 1,
          cursor: {
            id: cursor,
          },
        }),
        orderBy: {
          createdAt: "desc",
        },
      });

      const hasMore = projects.length > limit;
      const actualProjects = hasMore ? projects.slice(0, -1) : projects;
      const nextCursor = hasMore
        ? actualProjects[actualProjects.length - 1].id
        : null;

      return {
        projects: actualProjects.map((project) => ({
          ...project,
          createdAt: new Date(project.createdAt).toISOString(),
          updatedAt: new Date(project.updatedAt).toISOString(),
        })),
        nextCursor,
        hasMore,
      };
    },
    project: async (
      _: unknown,
      { id }: { id: string }
    ): Promise<ProjectGQL | null> => {
      const project = await prisma.project.findUnique({
        where: { id },
      });

      if (!project) return null;

      return {
        ...project,
        createdAt: new Date(project.createdAt).toISOString(),
        updatedAt: new Date(project.updatedAt).toISOString(),
      };
    },
  },
};
