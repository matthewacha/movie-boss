import '../css/app.scss';
import type { AppProps } from 'next/app';
import SideNavBar from '../components/sidenavbar';
import styled from 'styled-components';

function MyApp({ Component, pageProps }: AppProps) {
  return <PageContainer>
    <SideNavBar />
    <ContentWrapper>
      <Component {...pageProps} />
    </ContentWrapper>
  </PageContainer>
}

const ContentWrapper = styled.main`
    position: relative;
    padding-left: 280px;
    @media (max-width: 1024px) {
        padding-left: 200px;
    }
    @media (max-width: 768px) {
        padding-left: 0;
    }
`;

const PageContainer = styled.main`
    overflow-x: hidden;
`;

export default MyApp
