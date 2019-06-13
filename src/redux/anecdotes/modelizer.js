// @flow

export const modelizeAnecdotes = (
  apiAnecdote: ApiAnecdoteType
): AnecdoteType => ({
  id: apiAnecdote.id,
  title: apiAnecdote.title,
  description: apiAnecdote.description,
  createdAt: apiAnecdote.created_at,
  updatedAt: apiAnecdote.updated_at,
  image: apiAnecdote.image,
  url1: apiAnecdote.url1,
  url2: apiAnecdote.url2,
  url3: apiAnecdote.url3,
});
