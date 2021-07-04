import React from "react";

import SEO from "../components/seo";
import PostCard from "../components/PostCard";
import { graphql, Link } from "gatsby";
import NavProtector from "../components/navProtector";
import SvgSwitch from "../components/SvgSwitch";
import styled from "styled-components";
import mixins from "../helpers/mixins";
import AtomDesktop from "../components/home/AtomDesktop";
import AtomMobile from "../components/home/AtomMobile";
import SvgLCEText from "../components/home/SvgLCEText";

// --- query ---
export const query = graphql`
  query IndexPage {
    BlogPosts: allMdx(
      filter: { fileAbsolutePath: { regex: "/pages/posts/" } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 3
    ) {
      edges {
        node {
          frontmatter {
            title
            preview
          }
          slug
        }
      }
    }
    Projects: allMdx(
      filter: { fileAbsolutePath: { regex: "/pages/projects/" } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 3
    ) {
      edges {
        node {
          frontmatter {
            title
            preview
            date
          }
          slug
        }
      }
    }
  }
`;

export default function IndexPage({ data }) {
  // --- functions ---
  const getCardData = e => {
    const node = e.node;
    const { frontmatter, slug } = node;
    const { preview, title } = frontmatter;
    return { frontmatter, slug, preview, title };
  };
  // --- variables ---
  const posts = data.BlogPosts.edges.map(getCardData);
  const projects = data.Projects.edges.map(getCardData);
  const index =
    "I am a web developer and designer with a focus on front-end animation and application development. This site is primarily a way to show what I have been working on and the benefits and struggles of the tech I have been using. If you enjoy any of the articles feel free to send me a message and start a discussion about the topic!";

  return (
    <>
      <SEO title="Home" />
      <Hero />
      <AboutContainer>
        <NavProtector type="accent" />
        <AboutContent>
          <AboutHeader>About me</AboutHeader>
          <p>{index}</p>
        </AboutContent>
      </AboutContainer>
      <NavProtector type="main" />
      <PageSectionContainer style={{ marginTop: 0 }}>
        <PageTitleContainer>
          <PageTitle>Posts</PageTitle>
          <PageLink to="/posts">See all posts</PageLink>
        </PageTitleContainer>
        <CardGrid>
          {posts.map(p => (
            <PostCard key={p.title} post={p} toPage="posts" />
          ))}
        </CardGrid>
      </PageSectionContainer>
      <PageSectionContainer style={{ marginBottom: "3.75rem" }}>
        <PageTitleContainer>
          <PageTitle>Projects</PageTitle>
          <PageLink to="/projects">See all projects</PageLink>
        </PageTitleContainer>
        <CardGrid>
          {projects.map(p => (
            <PostCard key={p.title} post={p} toPage="projects" />
          ))}
        </CardGrid>
      </PageSectionContainer>
    </>
  );
}

// --- styled components ---
const AboutContainer = styled.div`
  background-color: white;
  margin: 2rem 0;
  width: 100%;
  padding-bottom: 3.75rem;

  .dark & {
    background-color: var(--gray-800);
  }
`;

const AboutContent = styled.div`
  ${mixins.container}
  margin: 0 auto;
  padding: 0 1rem;
`;

const AboutHeader = styled.h1`
  font-size: 2.25rem /* 36px */;
  line-height: 2.5rem /* 40px */;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const PageSectionContainer = styled.div`
  ${mixins.container}
  margin: 2rem auto;
  margin-bottom: 3.75rem;
`;

const PageTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 1rem;
`;

const PageTitle = styled.h2`
  font-size: 2.25rem /* 36px */;
  line-height: 2.5rem /* 40px */;
  font-weight: 500;
  margin-bottom: 2.25rem /* 36px */;
`;

const PageLink = styled(Link)`
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;
  height: 1.5rem;
  margin-bottom: 2.25rem;
`;

const CardGrid = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1fr, 320px));
  gap: 2rem;
  overflow-x: scroll;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    overflow-x: auto;
  }
`;

// @ Hero @
function Hero() {
  return (
    <HeroContainer>
      <NavProtector type="main" />
      <SvgLCEText />
      <AtomDesktop />
      <AtomMobile />
    </HeroContainer>
  );
}

// --- hero styled components ---
const HeroContainer = styled.div`
  position: relative;
  width: 100%;
`;
