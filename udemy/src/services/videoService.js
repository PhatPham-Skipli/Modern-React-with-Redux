import axios from 'axios';
import { YOUTUBE_CONFIG } from '../config/index';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchTrendingVideos = async () => {
    try {
        const url = `${BASE_URL}/videos?part=snippet,statistics&chart=mostPopular&regionCode=${YOUTUBE_CONFIG.DEFAULT_REGION}&maxResults=${YOUTUBE_CONFIG.MAX_RESULTS}&key=${YOUTUBE_CONFIG.API_KEY}`;
        const res = await axios.get(url);
        return res.data.items || [];
    } catch (error) {
        console.error('Error fetching trending videos:', error);
        return [];
    }
};

export const searchVideos = async (query) => {
    try {
        const url = `${BASE_URL}/search?part=snippet&type=video&q=${encodeURIComponent(
            query
        )}&regionCode=${YOUTUBE_CONFIG.DEFAULT_REGION}&relevanceLanguage=${
            YOUTUBE_CONFIG.DEFAULT_LANGUAGE
        }&maxResults=${YOUTUBE_CONFIG.MAX_RESULTS}&key=${
            YOUTUBE_CONFIG.API_KEY
        }`;
        const res = await axios.get(url);

        if (res.data.items && res.data.items.length > 0) {
            const videoIds = res.data.items
                .map((item) => item.id.videoId)
                .join(',');
            const statsUrl = `${BASE_URL}/videos?part=statistics&id=${videoIds}&key=${YOUTUBE_CONFIG.API_KEY}`;
            const statsRes = await axios.get(statsUrl);

            return res.data.items.map((item, index) => ({
                ...item,
                statistics: statsRes.data.items[index]?.statistics
            }));
        }
        return [];
    } catch (error) {
        console.error('Error searching videos:', error);
        return [];
    }
};

export const fetchVideoDetail = async (videoId) => {
    try {
        const url = `${BASE_URL}/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${YOUTUBE_CONFIG.API_KEY}`;
        const res = await axios.get(url);
        return res.data.items?.[0];
    } catch (error) {
        console.error('Error fetching video detail:', error);
        return null;
    }
};

export const formatViewCount = (count) => {
    if (!count) return '0';
    const num = Number(count);
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'N';
    }
    return num.toLocaleString('vi-VN');
};

export const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} tháng trước`;
    return `${Math.floor(diffDays / 365)} năm trước`;
};

export const fetchRelatedVideos = async (videoId) => {
    try {
        const url = `${BASE_URL}/search?part=snippet&type=video&relatedToVideoId=${videoId}&videoEmbeddable=true&maxResults=10&key=${YOUTUBE_CONFIG.API_KEY}`;
        const res = await axios.get(url);
        if (res.data.items && res.data.items.length > 0) {
            const videoIds = res.data.items
                .map((item) => item.id.videoId)
                .join(',');
            const statsUrl = `${BASE_URL}/videos?part=statistics&id=${videoIds}&key=${YOUTUBE_CONFIG.API_KEY}`;
            const statsRes = await axios.get(statsUrl);
            return res.data.items.map((item, index) => ({
                ...item,
                statistics: statsRes.data.items[index]?.statistics
            }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching related videos:', error);
        return [];
    }
};

export const fetchChannelDetail = async (channelId) => {
  try {
    const url = `${BASE_URL}/channels?part=snippet&id=${channelId}&key=${YOUTUBE_CONFIG.API_KEY}`
    const res = await axios.get(url)
    return res.data.items?.[0]?.snippet || null
  } catch (error) {
    console.error('Error fetching channel detail:', error)
    return null
  }
}
