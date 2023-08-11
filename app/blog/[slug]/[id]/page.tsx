
export default function Page({ params }: { params: { slug: string } }) {
  return <h1>id {params.slug}</h1>
}