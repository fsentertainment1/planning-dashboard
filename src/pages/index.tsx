import Head from 'next/head'
import Dashboard from '@/components/Dashboard'

export default function Home() {
  return (
    <>
      <Head>
        <title>NullPoint — Pro Audio Platform Strategie</title>
        <meta name="description" content="Strategisch platform plan voor een pro-audio engineering media platform. Ghost CMS, Hetzner, d&b specialisatie, community, memberships." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔊</text></svg>" />
      </Head>
      <Dashboard />
    </>
  )
}
