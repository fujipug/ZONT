import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='h-screen bg-[#d7f5d3] flex justify-center items-center'>
      <div>
        <div>
          <img src='https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHViamQwbDJ0MzhybDVmb3lnYXF0NzF3aDV2dmczOGJjMnRlYW10biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vLZJfnIqxLla26Gr4i/giphy.gif' />
        </div>
        <div className='text-center'>
          <h1 className='font-bold text-3xl'>Existe una capibara escuchando musica,</h1>
          <h1 className='font-bold text-3xl'>Pero no existe esta pagina</h1>
          <Link href="/">
            <button className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4'>
              Regresa a la Pagina Principal
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}