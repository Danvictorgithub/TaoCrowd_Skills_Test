import { faker } from "@faker-js/faker";

export type PostType = {
  id: string;
  title: string;
  status: "failed" | "success" | "upcoming";
  description: string;
  image: string;
  video: string;
  article: string;
  createdAt: Date;
  updatedAt: Date;
};

export const generateMockPost = (): PostType => {
  const statuses: PostType["status"][] = ["failed", "success", "upcoming"];
  const createdAt = faker.date.past();

  return {
    id: faker.database.mongodbObjectId(),
    title: faker.company.catchPhrase(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    description: faker.lorem.paragraph(),
    image: faker.image.url(),
    video: "https://example.com",
    article: "https://example.com",
    createdAt: createdAt,
    updatedAt: faker.date.between({ from: createdAt, to: Date.now() }),
  };
};

export const generateMockPosts = (count: number = 100): PostType[] => {
  return Array.from({ length: count }, generateMockPost);
};

// Replace the static mockPosts with the default 100 items
export const mockPosts: PostType[] = generateMockPosts();
