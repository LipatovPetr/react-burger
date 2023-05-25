import React from "react"
import ContentLoader from "react-content-loader"

const Placeholder = (props) => (
  <ContentLoader 
    speed={0.8}
    width={600}
    height={900}
    viewBox="0 0 600 900"
    backgroundColor="#1b1b27"
    foregroundColor="#000001"
    {...props}
  >
    <rect x="12" y="66" rx="0" ry="0" width="272" height="208" /> 
    <rect x="307" y="66" rx="0" ry="0" width="272" height="208" /> 
    <rect x="12" y="340" rx="0" ry="0" width="272" height="208" /> 
    <rect x="307" y="339" rx="0" ry="0" width="272" height="208" />  
    <rect x="12" y="18" rx="0" ry="0" width="172" height="36" /> 
    <rect x="12" y="290" rx="0" ry="0" width="172" height="36" /> 
    <rect x="11" y="615" rx="0" ry="0" width="272" height="208" /> 
    <rect x="307" y="614" rx="0" ry="0" width="272" height="208" /> 
    <rect x="12" y="565" rx="0" ry="0" width="172" height="36" />
  </ContentLoader>
)

export default Placeholder