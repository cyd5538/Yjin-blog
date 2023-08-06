import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from 'remark-gfm';
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger"

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description : {type : 'string'},
    image : {type : 'string'},
    tags : {type : "list", required: true, of: { type: 'string' }}
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
    headings: {
      type: "json",
      resolve: async (doc) => {
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger()
        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
            ({ groups }) => {
              const flag = groups?.flag;
              const content = groups?.content;
              return {
                level: flag?.length == 1 ? "one"
                : flag?.length == 2 ? "two"
                : "three",
                text: content,
                slug: content ? slugger.slug(content) : undefined
              };
            }
          );
          return headings;
        },
    }
  },
}))

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypePrettyCode, 
    ],
  },
});
