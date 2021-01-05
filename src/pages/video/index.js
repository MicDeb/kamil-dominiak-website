import React from 'react';

export default function Video() {
  return (
    <section className='section'>
      <h1>Video</h1>
      <iframe
        src='https://open.spotify.com/embed-podcast/episode/3MjjJ6Ef0ahaQDmFPYDZpB'
        width='100%'
        height='232'
        frameBorder='0'
        allowTransparency='true'
        allow='encrypted-media'
        title='Odc. 52 Jak nauczyć się śpiewać. Kamil Dominiak'
      />
      <iframe
        width='100%'
        height='232'
        // height='720'
        src='https://www.youtube.com/embed/VOq4YrZkHHc'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Ignacy Wiśniewski Trio + Kamil Dominiak / Obliczenia Pomyliłem'
      />

      <iframe
        width='100%'
        height='232'
        // height='720'
        src='https://www.youtube.com/embed/kM4XQrO79YI'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Na morza dnie (Under the Sea - The Little Mermaid - Polish version) Kamil Dominiak'
      />

      <iframe
        width='100%'
        height='232'
        // height='720'
        src='https://www.youtube.com/embed/Bh7TZtbtKF4'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Daj mu żyć (Bring Him Home - Les Misérables - Polish version) Kamil Dominiak'
      />
    </section>
  );
}
