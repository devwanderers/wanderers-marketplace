import React from 'react'
import { PropTypes } from 'prop-types'
import { Layout } from 'antd'
import DefaultFooter from '../Footers/DefaultFooter'
// import NoAuthNavbar from '../Navbar/NoAuthNavbar'
import Header from './../DisplayText/Header'

const { Content } = Layout

const DefaultLayout = ({ children, ...rest }) => {
    // const [isOpen, setOpenDrawer] = useState(false)
    return (
        <Layout className="overflow-x-hidden flex flex-col min-h-screen">
            {/* <Drawer
                title="Basic Drawer"
                placement="left"
                closable={false}
                onClose={() => setOpenDrawer(!isOpen)}
                visible={isOpen}
                key="left"
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer> */}
            <Header className="h-24 relative z-50 px-6 lg:px-0 text-white bg-blue-5">
                <div className="max-w-1300px m-auto flex h-full">
                    <div className="flex-1"></div>
                    <div className="flex items-center justify-center">
                        <button className="text-lg py-3 px-10 rounded-full border border-blue-2 text-blue-2">
                            Connect Wallet
                        </button>
                    </div>
                </div>
            </Header>
            <Content className="bg-white flex flex-1 flex-shrink flex-grow">
                {children}
            </Content>
            <DefaultFooter className="bg-white flex-1 flex-shrink flex-grow" />
        </Layout>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.element,
}

export default DefaultLayout
