import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from 'remark-gfm';

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
  },
}))

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[
      rehypePrettyCode, 
    ]],
  },
});
