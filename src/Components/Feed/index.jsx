import { Fragment, useEffect } from "react";

export const Feed = ({ list, onEndReached, keyExtractor, renderItem, renderFooter }) => {

    useEffect(() => {
      const onScroll = () => {
        if (window.innerHeight + window.scrollY >= window.document.body.offsetHeight - 32) {
          onEndReached();
        }
      }
      window.addEventListener('scroll', onScroll)
  
      return () => window.removeEventListener('scroll', onScroll);
    }, [onEndReached])
  
    return (
      <>
        {
          list.map((element, index) => (
            <Fragment key={keyExtractor(element, index)} >
              {renderItem(element, index)}
            </Fragment>
          ))
        }
        {
          renderFooter()
        }
      </>
    )
  
  }
  