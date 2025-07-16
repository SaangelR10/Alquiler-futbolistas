import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaCommentDots, FaShareAlt } from 'react-icons/fa';

const FeedPost = ({ post, onShowComments }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(likes + (liked ? -1 : 1));
  };

  return (
    <div className="relative w-full h-[80vh] max-h-[700px] flex flex-col justify-end items-center px-2 py-4">
      {/* Fondo glassmorphism */}
      <div className="absolute inset-0 rounded-3xl bg-white/30 backdrop-blur-xl shadow-2xl border border-white/20" style={{zIndex:1}} />
      {/* Contenido */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end">
        {/* Media */}
        {post.tipo === 'video' && (
          <video src={post.contenido} controls loop className="w-full h-[60vh] object-cover rounded-3xl mb-2 shadow-lg" />
        )}
        {post.tipo === 'imagen' && (
          <img src={post.contenido} alt="Publicación" className="w-full h-[60vh] object-cover rounded-3xl mb-2 shadow-lg" />
        )}
        {post.tipo === 'texto' && (
          <div className="w-full h-[60vh] flex items-center justify-center text-2xl font-bold text-blue-900 px-6 py-8">{post.descripcion}</div>
        )}
        {/* Info usuario y descripción */}
        <div className="flex items-center gap-3 px-4 mb-2">
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700 text-lg shadow border-2 border-white">{post.usuario[0]}</div>
          <div>
            <div className="font-bold text-blue-900 text-base">{post.usuario}</div>
            <div className="text-xs text-blue-600">{post.fecha}</div>
          </div>
        </div>
        <div className="px-4 pb-2 text-blue-900 text-base font-medium">{post.descripcion}</div>
        {/* Acciones sociales tipo TikTok */}
        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-20">
          <button onClick={handleLike} className="group bg-white/90 hover:bg-pink-100 rounded-full p-3 shadow-xl transition-all flex flex-col items-center border-2 border-pink-200 hover:scale-110 focus:outline-none">
            {liked ? <FaHeart className="text-pink-500 text-2xl animate-bounce" /> : <FaRegHeart className="text-gray-700 text-2xl group-hover:text-pink-500 transition" />}
            <span className="text-xs font-bold text-pink-600 mt-1 drop-shadow">{likes}</span>
          </button>
          <button onClick={onShowComments} className="group bg-white/90 hover:bg-blue-100 rounded-full p-3 shadow-xl transition-all flex flex-col items-center border-2 border-blue-200 hover:scale-110 focus:outline-none">
            <FaCommentDots className="text-blue-600 text-2xl group-hover:text-blue-800 transition" />
            <span className="text-xs font-bold text-blue-700 mt-1 drop-shadow">{post.comentarios || 0}</span>
          </button>
          <button className="group bg-white/90 hover:bg-green-100 rounded-full p-3 shadow-xl transition-all flex flex-col items-center border-2 border-green-200 hover:scale-110 focus:outline-none">
            <FaShareAlt className="text-green-600 text-2xl group-hover:text-green-800 transition" />
            <span className="text-xs font-bold text-green-700 mt-1 drop-shadow">{post.compartidos || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedPost; 