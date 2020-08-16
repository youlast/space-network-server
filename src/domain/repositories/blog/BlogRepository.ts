export default interface BlogRepository {
  getAllPosts(): Promise<void>;

  createPost(content: string, imagePost: string, title: string): Promise<void>;

  updatePost(
    title: string,
    content: string,
    imagePost: string,
    idPost: string
  ): Promise<void>;
}
