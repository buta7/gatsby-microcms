// pages/articles.js
import React from "react"
import { graphql,Link　} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


const PatientsPage = ({ data }) => (
 <Layout>
   <SEO title="患者の方へ" />

   {data.allMicrocmsArticles.edges.map(edge => {
     const articles = edge.node
     const category = edge.node.category[0].name
     console.log('◆categoryは　' + category)

     if (category == '買参人') {      //カテゴリーが患者さん用の場合表示
       return (
        <React.Fragment key={articles.id}>
         <div>
         <Link to={`/articles/${articles.id}`}>
                <h2>{articles.title}</h2>
             </Link>
         </div>
         <div>
             {articles.category.map(category => (
               <React.Fragment key={category.id}>
                 <span>カテゴリー：{category.name}</span>
               </React.Fragment>
             ))}
        </div>
        <hr />
       </React.Fragment>
       )
     } else { return }
   })}
 </Layout>
)

export const query = graphql`
 {
    allMicrocmsArticles(
     sort: { fields: [createdAt], order: DESC }
   ) {
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

export default PatientsPage