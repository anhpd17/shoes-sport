import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '../ui/breadcrumb'
import { SlashIcon } from '@radix-ui/react-icons'

export interface IBreadCrumb {
    title: string
    link?: string
}

interface Props {
    links?: IBreadCrumb[]
}
export default function BreadCrumb({ links }: Props) {
    return <div className='bg-[#f5f5f5]'>
            <div className='app-container bg-[#f5f5f5] flex items-center text-sm gap-2 font-roboto-slab text-[#333] py-2'>
            <Breadcrumb className=''>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Trang chủ</BreadcrumbLink>
                    </BreadcrumbItem>
                    {links && links.length > 0 && <BreadcrumbSeparator><SlashIcon /></BreadcrumbSeparator>}
                    {links?.map((link, index) => (
                        <>
                            {link.link ? <BreadcrumbItem>
                                <BreadcrumbLink href={link.link}>{link.title}</BreadcrumbLink>
                            </BreadcrumbItem> : <BreadcrumbPage>{link.title}</BreadcrumbPage>}
                            {index === links.length - 1 ? '' :<BreadcrumbSeparator><SlashIcon /></BreadcrumbSeparator>}
                        </>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    </div>
}
