import SearchPage from "../components/video/SearchPage";
import VideoDetailPage from "../components/video/VideoDetailPage";
import VideoLayout from "../layouts/VideoLayout";
import VideoPage from "../pages/Video/VideoPage";
import LikedVideosPage from "../pages/Video/LikedVideosPage";
import SubscriptionsPage from "../pages/Video/SubscriptionsPage";
import ChannelPage from "../pages/Video/ChannelPage";

const VideoRoutes = [
  {
    path: "/video",
    element: <VideoLayout />,
    children: [
      {
        path: "",
        element: <VideoPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      { 
        path: "liked", 
        element: <LikedVideosPage /> 
      },
      { 
        path: "subscriptions", 
        element: <SubscriptionsPage /> 
      },
      { 
        path: "channel/:channelId", 
        element: <ChannelPage /> 
      },
      { 
        path: ":id", 
        element: <VideoDetailPage /> 
      }
    ],
  },
];

export default VideoRoutes;