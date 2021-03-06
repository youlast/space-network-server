export default interface BlogRepository {
  getAllPosts(): Promise<void>;

  createPost(
    content: string,
    imagePost: string,
    title: string,
    username: string
  ): Promise<void>;

  updatePost(
    title: string,
    content: string,
    imagePost: string,
    idPost: string
  ): Promise<void>;

  deletePost(idPost: string): Promise<void>;
}
