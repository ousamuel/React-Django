import Image from "next/image";

export default function Home() {
  return (
    <main>
    <h1>Title</h1>
    <div id='submission'>add new post</div>
    <div className='projects-container'>
        <div className='project-box'>
          <Image alt='image1' />
        </div>
        <div className='project-box'></div>
        <div className='project-box'>example 1</div>
        <div className='project-box'>example 1</div>
        <div className='project-box'>example 1</div>
        <div className='project-box'>example 1</div>
        <div className='project-box'>example 1</div>
        <div className='project-box'>example 1</div>
        <div className='project-box'>example 1</div>
    </div>

  </main>
  );
}
