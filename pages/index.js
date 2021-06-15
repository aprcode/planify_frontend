import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Index() {
    const [ session, loading ] = useSession()
  return (
    <>
    {!session && <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
      </>}
      {session && <>
          <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tecnyx planning
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container></>}
      </>
  );
}
