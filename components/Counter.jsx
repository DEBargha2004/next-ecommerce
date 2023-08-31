function Counter ({ count, increment }) {
  return (
    <div className='w-[140px] flex justify-between items-center rounded-full bg-slate-100 mt-5 overflow-hidden'>
      <button
        className='text-[25px] w-[30%] transition-all hover:bg-slate-200'
        onClick={() => increment(-1)}
      >
        -
      </button>
      <span className='text-[25px]'>{count}</span>
      <button
        className='text-[25px] w-[30%] transition-all hover:bg-slate-200'
        onClick={() => increment(1)}
      >
        +
      </button>
    </div>
  )
}

export default Counter
