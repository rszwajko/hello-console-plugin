import * as React from 'react';
import Helmet from 'react-helmet';
import {
  Page,
  PageSection,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';
import { useVms } from '../utils/loader';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const Internal = () => {
  const { data } = useVms();
  return <Text component="p">Data: {JSON.stringify(data)}</Text>;
};

export default function ExamplePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Helmet>
        <title>Hello, Plugin!</title>
      </Helmet>
      <Page>
        <PageSection variant="light">
          <Title headingLevel="h1">Hello, Plugin!</Title>
        </PageSection>
        <PageSection variant="light">
          <TextContent>
            <Internal />
          </TextContent>
        </PageSection>
      </Page>
    </QueryClientProvider>
  );
}
