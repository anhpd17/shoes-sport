
import { useParams } from 'react-router-dom'
import { useSizeQuery } from '@/hooks/useSizeQuery'
import FormSize from './FormSize'
// import FormSlug from './FormSlug'

const Edit = () => {
    const { id } = useParams()
    const { data } = useSizeQuery(id);
    console.log('data - ', data)
    return (
        <div>
            <div className='grid grid-cols-2'>
                <div>
                    <FormSize data={data} />
                </div>
                {/* <div>
                    <FormSlug data={data} />
                </div> */}
            </div>
        </div>
    )
}

export default Edit