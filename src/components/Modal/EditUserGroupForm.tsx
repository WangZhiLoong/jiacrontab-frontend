import * as React from 'react'
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
// import '@ant-design/compatible/assets/index.css';
import { Modal, Input, Select, Radio, Checkbox } from 'antd';
import { ModalProps } from 'antd/lib/modal/Modal'
// import { FormComponentProps }  from 'antd/lib/form/Form';

interface Props extends ModalProps {
    visible: boolean
    handleOk?: any
    handleCancel?: any
    handleGroupChange?: any
    title: string
    groups: any[]
    changeVisible: any
}
interface State {
    radioValue: string
    checked: boolean
    disabled: boolean
    formRef: React.RefObject<FormInstance>
}
interface Data {
    groupID: number
}
class EditUserGroupForm extends React.Component<
    Props,
    State
    > {
    public state: State
    public data: Data
    constructor(props: Props ) {
        super(props)
        this.state = {
            checked: false,
            radioValue: 'new',
            disabled: false,
            formRef: React.createRef<FormInstance>()
        }
        this.data = {
            groupID: 0
        }
    }

    componentDidMount() { }
    private handleCancel = () => {
        this.props.changeVisible(false)
        this.state.formRef.current?.resetFields();
    }
    private radioChange = (e: any) => {
        if (e.target.value === 'new') {
            this.setState({
                checked: false,
                disabled: false,
                radioValue: e.target.value
            })
        } else {
            this.data.groupID = 1
            this.setState({
                checked: true,
                disabled: true,
                radioValue: e.target.value
            })
        }
    }
    render() {
        // const { form } = this.props
        // const { getFieldDecorator } = form
        return (
            <div>
                <Modal
                    title={this.props.title}
                    cancelText="取消"
                    okText="提交"
                    visible={this.props.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                >
                    <Form 
                        layout="vertical"
                        ref={this.state.formRef}
                        initialValues={
                            { 
                                types: this.state.radioValue, 
                                groupId:this.data.groupID,
                                root: true
                            }
                        }
                    >
                        <Form.Item name="types">
                                <Radio.Group onChange={this.radioChange}>
                                    <Radio value="new">新建分组</Radio>
                                    <Radio value="move">移动到指定分组</Radio>
                                </Radio.Group>
                        </Form.Item>
                        {this.state.radioValue == 'new' ? (
                            <Form.Item
                                name="title"
                                rules={[{ required: true, message: '请输入分组名称' }]}
                            >
                                <Input placeholder="请输入分组名称" />
                            </Form.Item>
                        ) : (
                                <Form.Item name="groupId">
                                    
                                        <Select
                                            onChange={(id: any, e: any) => {
                                                this.data.groupID = id
                                                if (id == 1) {
                                                    this.setState({
                                                        checked: true,
                                                        disabled: true
                                                    })
                                                } else {
                                                    this.setState({
                                                        disabled: false
                                                    })
                                                }
                                            }}
                                        >
                                            {this.props.groups.map(
                                                (value: any, index: number) => {
                                                    return (
                                                        <Select.Option
                                                            key={value['ID']}
                                                            value={value['ID']}
                                                        >
                                                            {value['name']}
                                                        </Select.Option>
                                                    )
                                                }
                                            )}
                                        </Select>
                                    
                                </Form.Item>
                            )}
                        <Form.Item name="root">
                                <Checkbox
                                    disabled={this.state.disabled}
                                    onChange={() => {
                                        if (this.data.groupID == 1) {
                                            this.setState({
                                                disabled: true,
                                                checked: true
                                            })
                                        } else {
                                            this.setState({
                                                disabled: false,
                                                checked: !this.state.checked
                                            })
                                        }
                                    }}
                                    checked={this.state.checked}
                                >
                                    管理员
                                </Checkbox>
                            
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

// export default Form.create({})(EditUserGroupForm)
export default EditUserGroupForm
// ReactDOM.render(<EditUserGroupForm />, mountNode);
// export default Form.create<FormComponentProps & ModalProps & Props>()(EditUserGroupForm)
