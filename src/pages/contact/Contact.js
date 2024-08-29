import { redirect } from 'next/navigation';
export default async function Home({ params }) {
    redirect('https://matrix.to/#/@tomas:tomasps.com');
  // ...
}