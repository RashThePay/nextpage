import { Grid, GridItem } from "@chakra-ui/react";
import { apiDreams } from "@/api";
import { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import styles from "@/styles.json";
import Dream from "@/components/Dream";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (session) {
    const query = '?sort[0]=createdAt:desc&populate=*&filters[user][username][$eq]='+session.user.name;
    const response = await fetch(apiDreams + query);
    const repo = await response.json();
    return { props: { repo, session } };
  }
  return;
}

export default function Page({ repo, session }) {
  
  const [style, setStyle] = useState(null)
  const [dreams, setDreams] = useState(repo.data)
  useEffect(() => {
    if (style > 0) {
      const query = '?sort[0]=createdAt:desc&populate=*&filters[style][$eq]='+style+"&filters[user][username][$eq]="+session.user.name;
      fetch(apiDreams+query)
        .then((res) => res.json())
        .then((data) => {
          if (data.data.length) { 
            setDreams(data.data)
          }
        })
    } else {
      setDreams(repo.data)
    }
  }, [style]);
  if (dreams) return (
    <>
      <Tabs onSelectionChange={(key)=>setStyle(key)} color="default" className="sticky" classNames={{tabList: "max-h-[400px] flex-col bg-default-400 backdrop-blur-lg p-1", cursor:"bg-primary-100", tab:"[&>div]:text-white"}}>
        <Tab key={0} title="همه" />
        
        {styles.map((stylex)=>{ return (
          <Tab key={stylex.id} title={stylex.name} />)
        })}

      </Tabs>
      <Grid justifyContent="center" templateColumns='repeat(auto-fit, minmax(1dvw, 1px))' gap={10}>
        {dreams.map((dream) => {
          return (
            <GridItem key={dream.id}
              rowSpan={(dream.attributes.orientation == 'portrait') ? 18 : 11}
              colSpan={11}>
              <Dream dream={dream} hasFooter={true}/>
            </GridItem>
          )
        })}
      </Grid>
    </>

  );
  return (<span className="z-10">پروفایل شما خالی است...</span>)
}
