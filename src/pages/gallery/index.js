import {Grid, Card, CardHeader} from "@/components/Gallery"
import {base, apiDreams} from "@/api"
import Image from "next/image";

export async function getServerSideProps() {
    const query = '?sort[0]=createdAt:desc&populate[image][fields][0]=url&populate[prompt]=*';
    const res = await fetch(apiDreams + query, { next: { revalidate: 300 } });
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const repo = await res.json();
    const dreams = repo.data;
    return {props: { dreams }};
}

export default function Gallery({ dreams }) {
    return (
        <Grid>
                {dreams.map((dream) => {
                    <Card className="col-span-12 sm:col-span-4 h-[300px]">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                      <h4 className="text-white font-medium text-large">{dream.attributes.prompt.main_fa}</h4>
                    </CardHeader>
                    <Image
                      removeWrapper
                      alt="Card background"
                      className="z-0 w-full h-full object-cover"
                      src={base+dream.attributes.image.data.attributes.url}
                    />
                  </Card>
                })}
        </Grid>

    );
}
