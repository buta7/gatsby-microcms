/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
 const { createPage } = actions

 const result = await graphql(
   `
     {
        allMicrocmsArticles {
         edges {
           node {
             id
             title
             category {
                id
                name
             }
             body
           }
         }
       }
     }
   `
 )

 if (result.errors) {
   throw result.errors
 }

 result.data.allMicrocmsArticles.edges.forEach(edge => {
     //上記のGraphQLでcategoryを書いてないがnode.categoryを掴めるようだ
     const categoryName = edge.node.category[0].name
     switch (categoryName) {
         case '出荷者':  // categoryがpatientsだったらサブパスをpatientsに
             subDir = '/growers/'+ edge.node.id
             break;
         case '買受人':  // categoryがdoctorsだったらサブパスをdoctorsに
             subDir = '/buyers/'+edge.node.id
             break;
         default:
             subDir = '/articles/'+edge.node.id
     }
   createPage({
     //path: `/patients/${edge.node.id}`,
     path: `${subDir}`,
     component: path.resolve(
       "./src/templates/article.js"
     ),
     context: {
       id: edge.node.id,
     },
   })

 })
}
