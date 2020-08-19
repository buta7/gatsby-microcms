// pages/buyer.js
import React from "react"
import { graphql,Link　} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


const BuyersPage = ({ data }) => (
 <Layout>
   <SEO title="買受人の方へ" />

   {data.allMicrocmsArticles.edges.map(edge => {
     const articles = edge.node
     const category = edge.node.category[0].name
     console.log('◆categoryは　' + category)

     if (category == '買受人') {      //カテゴリーが買受人用の場合表示
       return (
        <React.Fragment key={articles.id}>
         <div>
         <Link to={`/buyers/${articles.id}`}>
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

export default BuyersPage