/** @jsx jsx */
import { jsx, Box, Styled, Flex } from 'theme-ui'
import React from 'react'
import PortableText from '../PortableText'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import { useTranslation } from 'react-i18next'
import { translateRaw } from '../../lib/helpers'
import { CategoryPreview } from './CategoryPreview'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import { ProfilePreview } from '../Shop/ProfilePreview'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import 'video-react/dist/video-react.css'
import YouTube from 'react-youtube'
import getVideoId from 'get-video-id'
import { Player } from 'video-react'
import { Helmet } from 'react-helmet'

export const Post = (nonExtensiblePost) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  graphql`
    fragment blogPostFields on SanityBlogPost {
      id
      publishedAt
      _rawSlug
      _rawTitle
      _rawExcerpt
      postLanguages: language
      image {
        asset {
          fluid(maxWidth: 640) {
            ...GatsbySanityImageFluid
          }
        }
      }
      categories {
        id
        _rawTitle
        _rawSlug
      }
      _rawBody
      author {
        title
      }
      video {
        url
      }
      videoFile {
        asset {
          url
        }
      }
      audio {
        asset {
          url
        }
      }
      featuredProfiles {
        ...profilePreviewFields
      }
    }
  `

  const post = { ...nonExtensiblePost }
  const {
    title,
    excerpt,
    image,
    body,
    author,
    video,
    videoFile,
    audio,
    publishedAt,
    categories,
    featuredProfiles,
  } = translateRaw(post, language)

  const videoParsed = video && video.url && getVideoId(video.url)
  const video_id = videoParsed && videoParsed.id

  return (
    <article
      sx={{
        maxWidth: 640,
        mx: 'auto',
      }}
    >
      <Flex
        sx={{
          alignItems: 'center',
          fontSize: 0,
        }}
      >
        {publishedAt && <React.Fragment>{t('blog:posted_at', { date: new Date(publishedAt) })}</React.Fragment>}
        <IoIosArrowDroprightCircle />
        {` `}
        {categories
          .map((c) => <CategoryPreview key={c.id} {...c} />)
          .reduce((acc, el) => {
            return acc === null ? [el] : [...acc, ', ', el]
          }, null)}
      </Flex>
      <Styled.h1>{title}</Styled.h1>
      {excerpt && <div sx={{ fontSize: 3 }}>{excerpt}</div>}
      {!video_id && image && image.asset && (
        <div>
          <Img fluid={image.asset.fluid} />
        </div>
      )}
      {video_id && (
        <React.Fragment>
          <Helmet>
            <meta name="introduction" content="no-reference" />
          </Helmet>
          <YouTube
            videoId={video_id}
            opts={{
              width: '100%',
            }}
            sx={{ mt: 3 }}
          />
        </React.Fragment>
      )}
      {videoFile && videoFile.asset && videoFile.asset.url && (
        <Box mt={3}>
          <Player
            playsInline
            //poster="/assets/poster.png"
            src={videoFile.asset.url}
          />
        </Box>
      )}
      {audio && audio.asset && audio.asset.url && (
        <Box mt={3}>
          <AudioPlayer src={audio.asset.url} />
        </Box>
      )}
      {featuredProfiles.length > 0 && (
        <Box>
          Avec la participation de :{` `}
          {featuredProfiles
            .map((t) => t && <ProfilePreview key={t.id} {...t} showAvatar={false} />)
            .reduce((acc, el) => {
              return acc === null ? [el] : [...acc, ', ', el]
            }, null)}
        </Box>
      )}
      <div sx={{ mt: 3 }}>{body && <PortableText blocks={body} />}</div>
      {author && <Box mt={3}>{author.title}</Box>}
    </article>
  )
}
