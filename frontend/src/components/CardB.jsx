import CardBCSS from './CardACSS.module.css'

const CardB = () => {
  return (
    <div className={CardBCSS['container']}>
        <div className={CardBCSS['title']}>
            <div className={CardBCSS['cont']}>
                <h4>Updates</h4>
            </div>
            
        </div>
        <div className={CardBCSS['items']}>
            <p style={{textAlign: 'center', color: '#8c949b'}}>No Updates</p>
        </div>
        
    </div>
  )
}

export default CardB