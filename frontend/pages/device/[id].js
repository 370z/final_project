import React from 'react'
import { useRouter } from 'next/router'
function Device() {
    const router = useRouter();
    const { id } = router.query
  return (
    <div>Device {id}</div>
  )
}
Device.layout ="Admin";
export default Device