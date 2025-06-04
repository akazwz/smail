#!/bin/bash

# 测试邮件接收功能的脚本
# 使用方法: ./scripts/test-email.sh [to_email] [from_email]

TO_EMAIL=${1:-"test@smail.pw"}
FROM_EMAIL=${2:-"sender@example.com"}
PORT=${3:-5173}

echo "发送测试邮件到本地服务器..."
echo "收件人: $TO_EMAIL"
echo "发件人: $FROM_EMAIL"
echo "端口: $PORT"
echo ""

curl --request POST "http://localhost:$PORT/dev/email-handler" \
  --url-query "from=$FROM_EMAIL" \
  --url-query "to=$TO_EMAIL" \
  --header 'Content-Type: application/json' \
  --data-raw "Received: from smtp.example.com (127.0.0.1)
        by cloudflare-email.com (unknown) id 4fwwffRXOpyR
        for <$TO_EMAIL>; $(date -R)
From: \"测试发件人\" <$FROM_EMAIL>
Reply-To: $FROM_EMAIL
To: $TO_EMAIL
Subject: 本地开发测试邮件
Content-Type: text/html; charset=\"utf-8\"
X-Mailer: Test Script
Date: $(date -R)
Message-ID: <$(date +%s)@test.local>

<html>
<body>
<h1>本地开发测试邮件</h1>
<p>这是一封测试邮件，用于验证本地开发环境的邮件处理功能。</p>
<p>发送时间: $(date)</p>
<p>收件人: $TO_EMAIL</p>
<p>发件人: $FROM_EMAIL</p>

<h2>测试内容</h2>
<ul>
<li>HTML内容解析</li>
<li>中文字符支持</li>
<li>附件处理（如果有）</li>
</ul>

<p>如果你能看到这封邮件，说明邮件处理功能正常工作！</p>
</body>
</html>"

echo ""
echo "测试邮件发送完成！"
echo "请检查开发服务器的日志输出。" 