import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert, Modal, Spin } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import md5 from 'md5';
import styles from './Login.less';
import { accountSubmit, mobileSubmit, fetchCaptcha, sendSMS } from '../../actions/auth';

const FormItem = Form.Item;
const { TabPane } = Tabs;

@connect(state => ({
  login: state.auth,
}))
@Form.create()
export default class Login extends Component {
  state = {
    count: 0,
    type: 'account',
    captchaImg: '',
    captchaId: '',
    captchaLoading: false,
  }

  componentWillMount() {
    this.onGetCaptcha();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.status === 'ok') {
      this.props.dispatch(push('/'));
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSwitch = (key) => {
    this.setState({
      type: key,
    });
  }


  onGetSMSCode = () => {
    this.props.form.validateFields(['mobile', 'mobileCaptcha'], { force: true },
      (err, values) => {
        if (!err) {
          this.countDown();
          this.props.dispatch(sendSMS(values.mobile, this.state.captchaId, values.mobileCaptcha,
            (data) => {
              if (data === 'ok') {
                // 短信发错成功
              }
            }
          ));
        }
      }
    );
  }

  @Debounce(1000, { leading: true })
  onGetCaptcha() {
    if (this.state.captchaLoading) return;
    this.setState({ captchaLoading: true });
    this.props.dispatch(fetchCaptcha((d) => {
      this.setState({
        captchaLoading: false,
        captchaImg: `data:image/jpg;base64,${d.img}`,
        captchaId: d.imgId,
      });
    }));
  }

  countDown = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { type } = this.state;
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          if (type === 'account') {
            this.props.dispatch(accountSubmit(values.userName, md5(values.password),
              this.state.captchaId,
              values.accountCaptcha, () => {
                this.props.dispatch(push('/'));
              })
            );
          } else {
            this.props.dispatch(mobileSubmit(values.mobile, values.smsCode, () => {
              this.props.dispatch(push('/'));
            }));
          }
        }
      }
    );
  }

  renderMessage = (message) => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={message}
        type="error"
        showIcon
      />
    );
  }

  render() {
    const { form, login } = this.props;
    const { getFieldDecorator } = form;
    const { count, type } = this.state;
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          <Tabs animated={false} className={styles.tabs} activeKey={type} onChange={this.onSwitch}>
            <TabPane tab="账户密码登录" key="account">
              {
                login.status === 'error' &&
                login.type === 'account' &&
                login.submitting === false &&
                this.renderMessage('账户或密码错误')
              }
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{
                    required: type === 'account', message: '请输入账户名！',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" className={styles.prefixIcon} />}
                    placeholder="admin"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    required: type === 'account', message: '请输入密码！',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" className={styles.prefixIcon} />}
                    type="password"
                    placeholder="888888"
                  />
                )}
              </FormItem>
              <FormItem>
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('accountCaptcha', {
                      rules: [{
                        required: type === 'account', message: '请输入验证码！',
                      }],
                    })(
                      <Input
                        size="large"
                        prefix={<Icon type="mail" className={styles.prefixIcon} />}
                        placeholder="验证码"
                      />
                    )}
                  </Col>
                  <Col span={8}>
                    <Spin spinning={this.state.captchaLoading} >
                      <img alt="图形验证码" title="图形验证码" onClick={this.onGetCaptcha.bind(this)} className={styles.captchaImg} src={this.state.captchaImg} />
                    </Spin>
                  </Col>
                </Row>
              </FormItem>
            </TabPane>
            <TabPane tab="手机号登录" key="mobile">
              {
                login.status === 'error' &&
                login.type === 'mobile' &&
                login.submitting === false &&
                this.renderMessage('验证码错误')
              }
              <FormItem>
                {getFieldDecorator('mobile', {
                  rules: [{
                    required: type === 'mobile', message: '请输入手机号！',
                  }, {
                    pattern: /^1\d{10}$/, message: '手机号格式错误！',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="mobile" className={styles.prefixIcon} />}
                    placeholder="手机号"
                  />
                )}
              </FormItem>
              <FormItem>
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('mobileCaptcha', {
                      rules: [{
                        required: type === 'mobile', message: '请输入图形验证码！',
                      }],
                    })(
                      <Input
                        size="large"
                        prefix={<Icon type="mail" className={styles.prefixIcon} />}
                        placeholder="图形验证码"
                      />
                    )}
                  </Col>
                  <Col span={8}>
                    <Spin spinning={this.state.captchaLoading} >
                      <img alt="图形验证码" title="图形验证码" onClick={this.onGetCaptcha.bind(this)} className={styles.captchaImg} src={this.state.captchaImg} />
                    </Spin>
                  </Col>
                </Row>
              </FormItem>
              <FormItem>
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('smsCode', {
                      rules: [{
                        required: type === 'mobile', message: '请输入短信验证码！',
                      }],
                    })(
                      <Input
                        size="large"
                        prefix={<Icon type="mail" className={styles.prefixIcon} />}
                        placeholder="短信验证码"
                      />
                    )}
                  </Col>
                  <Col span={8}>
                    <Button
                      disabled={count}
                      className={styles.getCaptcha}
                      size="large"
                      onClick={this.onGetSMSCode}
                    >
                      {count ? `${count} s` : '获取验证码'}
                    </Button>
                  </Col>
                </Row>
              </FormItem>
            </TabPane>
          </Tabs>
          <FormItem className={styles.additional}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox className={styles.autoLogin}>自动登录</Checkbox>
            )}
            <a
              className={styles.forgot}
              href="javascript:;"
              onClick={() => {
                Modal.info({
                  content: '请联系管理员找回密码^_^',
                });
              }}
            >忘记密码
            </a>
            <Button size="large" loading={login.submitting} className={styles.submit} type="primary" htmlType="submit">
              登录
            </Button>
          </FormItem>
        </Form>
        <div className={styles.other}>
          {/* 其他登录方式 */}
          {/* 需要加到 Icon 中 */}
          {/* <span className={styles.iconAlipay} /> */}
          {/* <span className={styles.iconTaobao} /> */}
          {/* <span className={styles.iconWeibo} /> */}
          <Link className={styles.register} to="/user/register">注册账户</Link>
        </div>
      </div>
    );
  }
}
