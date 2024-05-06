import './style.css'

  export const FeedElement = ({
    companyName,
    jdLink,
    jdUid,
    jobDetailsFromCompany,
    jobRole,
    location,
    logoUrl,
    minExp,
    maxExp,
    minJdSalary,
    maxJdSalary,
    salaryCurrencyCode
  }) => {
  
  
  
    return (
      <div className='feed-element' >
        <div className='feed-element-header' >
          <div className='feed-element-logo' >
            <img src={logoUrl} alt={`${companyName}-${jobRole}`} />
          </div>
          <div className='feed-element-title' >
            <h3 className='feed-element-company-name' >{companyName}</h3>
            <h2 className='feed-element-role' >{jobRole}</h2>
            <p className='feed-element-location' >{location}</p>
          </div>
        </div>
  
        <p className='feed-element-salary' >Estimated Salary: {minJdSalary} - {maxJdSalary}</p>
  
        <p className='feed-element-abt-company' >About Company:</p>
  
        <p className='feed-element-abt-us' >About Us</p>
  
        <p className='feed-element-detail' >{`${jobDetailsFromCompany}`}</p>
  
        <div className='feed-element-exp' >
          <h3 className='feed-element-exp-title' >Minimum Experience</h3>
          <p className='feed-element-exp-value' >{minExp} years</p>
        </div>
  
        <div className='feed-element-footer' >
          <a className='feed-element-footer-apply' target='_blank' rel='noreferrer' href={jdLink} >Easy Apply</a>
          <a className='feed-element-footer-referrals' target='_blank' rel='noreferrer' href={jdLink} >Unlock referral asks</a>
        </div>
  
      </div>
    )
  }
  