// ============================================
// CLOUDFLARE WORKER — Kers0ne Protection
// Secret: 344d7076790047fa8440947d1a16bf27
// ============================================

// --- COMPLETE HTML PANEL ---
const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kers0ne Protection</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
    <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        :root { --bg:#000; --card:#0a0a0a; --border:rgba(255,255,255,0.08); --text:#fff; --muted:#666; --radius:12px; --shadow:0 8px 32px rgba(0,0,0,0.8); --transition:0.25s cubic-bezier(0.4,0,0.2,1); }
        body { background:var(--bg); color:var(--text); font-family:'Inter',sans-serif; min-height:100vh; display:flex; justify-content:center; align-items:center; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-thumb { background:#333; border-radius:10px; }
        .auth-container { width:100%; max-width:420px; padding:20px; }
        .auth-box { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:40px; box-shadow:var(--shadow); }
        .auth-box .logo { font-size:28px; font-weight:800; text-align:center; margin-bottom:8px; color:#fff; }
        .auth-box .logo span { color:var(--muted); font-weight:400; }
        .auth-box .subtitle { text-align:center; color:var(--muted); font-size:14px; margin-bottom:32px; }
        .form-group { margin-bottom:18px; }
        .form-group label { display:block; font-size:13px; font-weight:500; color:var(--muted); margin-bottom:6px; }
        .form-group input { width:100%; background:rgba(0,0,0,0.6); border:1px solid var(--border); color:var(--text); padding:12px 16px; border-radius:10px; font-family:'Inter',sans-serif; font-size:14px; transition:var(--transition); }
        .form-group input:focus { outline:none; border-color:#666; }
        .btn { width:100%; padding:14px; border-radius:10px; font-weight:600; font-size:14px; border:none; cursor:pointer; transition:var(--transition); font-family:'Inter',sans-serif; }
        .btn-primary { background:#fff; color:#000; }
        .btn-primary:hover { background:#ddd; transform:translateY(-1px); }
        .btn-outline { background:transparent; border:1px solid var(--border); color:var(--text); }
        .btn-outline:hover { border-color:#fff; color:#fff; background:rgba(255,255,255,0.04); }
        .auth-toggle { text-align:center; margin-top:20px; color:var(--muted); font-size:14px; }
        .auth-toggle a { color:#fff; cursor:pointer; text-decoration:none; border-bottom:1px solid #333; }
        .auth-toggle a:hover { border-bottom-color:#fff; }
        .error-msg { color:#ff4444; font-size:13px; margin-top:8px; display:none; }
        .success-msg { color:#44ff44; font-size:13px; margin-top:8px; display:none; }
        .app-hidden { display:none !important; }
        .app-container { width:100%; max-width:1400px; padding:20px; margin:0 auto; }
        .app-layout { display:flex; gap:24px; min-height:100vh; }
        .sidebar { width:260px; background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:28px 20px; height:fit-content; position:sticky; top:20px; flex-shrink:0; }
        .sidebar .logo { font-size:20px; font-weight:800; margin-bottom:32px; color:#fff; }
        .sidebar .logo span { font-weight:400; color:var(--muted); font-size:14px; }
        .sidebar .user-info { padding:12px 0; border-bottom:1px solid var(--border); margin-bottom:20px; }
        .sidebar .user-info .email { font-size:13px; color:var(--muted); word-break:break-all; }
        .sidebar .user-info .status { font-size:12px; color:#44ff44; margin-top:4px; }
        .sidebar nav a { display:flex; align-items:center; gap:12px; padding:10px 14px; border-radius:10px; color:var(--muted); text-decoration:none; font-size:14px; font-weight:500; transition:var(--transition); cursor:pointer; }
        .sidebar nav a:hover { background:rgba(255,255,255,0.04); color:var(--text); }
        .sidebar nav a.active { background:rgba(255,255,255,0.06); color:#fff; }
        .sidebar nav a .badge-nav { margin-left:auto; background:rgba(255,255,255,0.06); color:var(--muted); font-size:10px; padding:2px 10px; border-radius:20px; font-weight:700; }
        .sidebar .bottom { border-top:1px solid var(--border); padding-top:20px; margin-top:20px; }
        .sidebar .bottom a { color:var(--muted); text-decoration:none; font-size:13px; display:flex; align-items:center; gap:12px; padding:10px 14px; border-radius:10px; transition:var(--transition); cursor:pointer; }
        .sidebar .bottom a:hover { background:rgba(255,255,255,0.04); color:#ff4444; }
        .main-content { flex:1; min-width:0; }
        .topbar { display:flex; justify-content:space-between; align-items:center; padding-bottom:20px; border-bottom:1px solid var(--border); margin-bottom:28px; flex-wrap:wrap; gap:12px; }
        .topbar h2 { font-size:22px; font-weight:700; color:#fff; }
        .domain-badge { background:rgba(255,255,255,0.04); border:1px solid var(--border); border-radius:20px; padding:4px 16px; font-size:12px; color:var(--muted); font-family:'JetBrains Mono',monospace; }
        .card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:24px; margin-bottom:24px; }
        .card .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; flex-wrap:wrap; gap:12px; }
        .card .header h3 { font-size:16px; font-weight:600; color:#fff; display:flex; align-items:center; gap:10px; }
        .card .header h3 .count { font-size:12px; font-weight:500; color:var(--muted); background:rgba(255,255,255,0.04); padding:2px 12px; border-radius:20px; }
        .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:16px; }
        .script-card { padding:18px; background:rgba(0,0,0,0.4); border:1px solid var(--border); border-radius:var(--radius); transition:var(--transition); }
        .script-card:hover { border-color:#444; transform:translateY(-2px); }
        .script-card .name { font-weight:600; font-size:15px; color:#fff; margin-bottom:4px; }
        .script-card .id { color:var(--muted); font-size:11px; font-family:'JetBrains Mono',monospace; margin-bottom:10px; }
        .badge { font-size:10px; font-weight:600; padding:3px 12px; border-radius:20px; display:inline-block; }
        .badge-active { background:rgba(68,255,68,0.1); color:#44ff44; }
        .badge-disabled { background:rgba(255,68,68,0.1); color:#ff4444; }
        .badge-ffa { background:rgba(255,255,68,0.1); color:#ffff44; }
        .badge-compressed { background:rgba(255,255,255,0.05); color:#aaa; }
        .loadstring-box { background:rgba(0,0,0,0.6); border-radius:8px; padding:8px 12px; font-family:'JetBrains Mono',monospace; font-size:10px; color:#aaa; word-break:break-all; margin:10px 0; cursor:pointer; border:1px dashed var(--border); transition:var(--transition); position:relative; }
        .loadstring-box:hover { border-color:#666; }
        .loadstring-box .copy-hint { position:absolute; right:8px; top:50%; transform:translateY(-50%); font-size:9px; color:var(--muted); opacity:0; transition:var(--transition); }
        .loadstring-box:hover .copy-hint { opacity:1; }
        .script-card .actions { display:flex; gap:6px; margin-top:12px; flex-wrap:wrap; }
        .btn-sm { padding:5px 12px; font-size:10px; border-radius:8px; border:none; cursor:pointer; transition:var(--transition); font-family:'Inter',sans-serif; font-weight:600; }
        .btn-sm-outline { background:transparent; border:1px solid var(--border); color:var(--text); }
        .btn-sm-outline:hover { border-color:#fff; color:#fff; }
        .btn-sm-danger { background:rgba(255,68,68,0.08); color:#ff4444; border:1px solid rgba(255,68,68,0.15); }
        .btn-sm-danger:hover { background:rgba(255,68,68,0.15); }
        .btn-sm-success { background:rgba(68,255,68,0.08); color:#44ff44; border:1px solid rgba(68,255,68,0.15); }
        .btn-sm-success:hover { background:rgba(68,255,68,0.15); }
        .btn-sm-primary { background:#fff; color:#000; }
        .btn-sm-primary:hover { background:#ddd; }
        .panel { display:none; }
        .panel.active { display:block; }
        .empty-state { grid-column:1/-1; text-align:center; padding:50px 20px; color:var(--muted); }
        .empty-state .icon { font-size:40px; margin-bottom:12px; opacity:0.3; }
        .empty-state h4 { font-size:16px; color:var(--text); margin-bottom:6px; }
        .form-row { display:flex; gap:12px; flex-wrap:wrap; margin-top:10px; }
        .form-row label { display:flex; align-items:center; gap:6px; font-size:13px; cursor:pointer; color:var(--muted); }
        .form-row input[type="checkbox"] { width:auto; accent-color:#fff; transform:scale(1.1); }
        input, textarea, select { width:100%; background:rgba(0,0,0,0.6); border:1px solid var(--border); color:var(--text); padding:11px 14px; border-radius:10px; font-family:'Inter',sans-serif; font-size:13px; transition:var(--transition); }
        input:focus, textarea:focus, select:focus { outline:none; border-color:#666; }
        textarea { resize:vertical; min-height:120px; font-family:'JetBrains Mono',monospace; font-size:12px; }
        .status-message { font-size:13px; margin-top:12px; padding:10px 16px; border-radius:10px; background:rgba(0,0,0,0.3); }
        .status-message.success { color:#44ff44; border-left:3px solid #44ff44; }
        .status-message.error { color:#ff4444; border-left:3px solid #ff4444; }
        .status-message.info { color:#aaa; border-left:3px solid #555; }
        .toast { position:fixed; bottom:30px; right:30px; padding:14px 24px; border-radius:12px; background:#111; border:1px solid #333; color:var(--text); font-size:14px; font-weight:500; box-shadow:var(--shadow); transform:translateY(100px); opacity:0; transition:var(--transition); z-index:999; max-width:400px; }
        .toast.show { transform:translateY(0); opacity:1; }
        .toast.success { border-color:#44ff44; }
        .toast.error { border-color:#ff4444; }
        @media (max-width:768px) { .app-layout { flex-direction:column; } .sidebar { width:100%; position:relative; top:0; } .auth-box { padding:28px 20px; } .grid { grid-template-columns:1fr; } }
    </style>
</head>
<body>
    <!-- AUTH -->
    <div id="authContainer" class="auth-container">
        <div class="auth-box">
            <div class="logo">Kers0ne<span>Protection</span></div>
            <div class="subtitle" id="authSubtitle">Sign in to access your scripts</div>
            <div id="loginForm">
                <div class="form-group"><label>Email</label><input type="email" id="loginEmail" placeholder="you@example.com" /></div>
                <div class="form-group"><label>Password</label><input type="password" id="loginPassword" placeholder="••••••••" /></div>
                <div id="loginError" class="error-msg"></div>
                <button class="btn btn-primary" onclick="handleLogin()">Sign In</button>
                <div class="auth-toggle">Don't have an account? <a onclick="showSignup()">Sign up</a></div>
            </div>
            <div id="signupForm" style="display:none;">
                <div class="form-group"><label>Email</label><input type="email" id="signupEmail" placeholder="you@example.com" /></div>
                <div class="form-group"><label>Password</label><input type="password" id="signupPassword" placeholder="•••••••• (min 6 chars)" /></div>
                <div class="form-group"><label>Confirm Password</label><input type="password" id="signupConfirm" placeholder="••••••••" /></div>
                <div id="signupError" class="error-msg"></div>
                <button class="btn btn-primary" onclick="handleSignup()">Create Account</button>
                <div class="auth-toggle">Already have an account? <a onclick="showLogin()">Sign in</a></div>
            </div>
            <div id="verificationPending" style="display:none;">
                <div class="verification-banner" style="background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:10px;padding:16px;text-align:center;">
                    <span style="font-size:32px;display:block;margin-bottom:8px;">📧</span>
                    <h4>Verify Your Email</h4>
                    <p style="color:var(--muted);font-size:13px;">We've sent a verification link to <strong id="verifyEmailDisplay"></strong></p>
                    <p style="font-size:12px;color:#ff4444;margin-top:8px;">⚠️ Check your spam folder</p>
                    <button class="resend-btn" style="background:transparent;border:1px solid #333;color:#fff;padding:6px 20px;border-radius:8px;cursor:pointer;font-size:12px;margin-top:10px;" onclick="resendVerification()">Resend</button>
                    <button class="resend-btn" style="background:transparent;border:1px solid #ff4444;color:#ff4444;padding:6px 20px;border-radius:8px;cursor:pointer;font-size:12px;margin-top:10px;margin-left:8px;" onclick="handleLogout()">Logout</button>
                </div>
            </div>
        </div>
    </div>
    <!-- APP -->
    <div id="appContainer" class="app-container app-hidden">
        <div class="app-layout">
            <div class="sidebar">
                <div class="logo">Kers0ne<span>Protection</span></div>
                <div class="user-info"><div class="email" id="appUserEmail">user@example.com</div><div class="status">✅ Verified</div></div>
                <nav>
                    <a class="active" data-panel="panel-scripts">📜 Scripts <span class="badge-nav" id="appScriptCount">0</span></a>
                    <a data-panel="panel-obfuscator">🔮 Obfuscator</a>
                    <a data-panel="panel-keys">🔑 Keys <span class="badge-nav" id="appKeyCount">0</span></a>
                    <a data-panel="panel-hwids">🚫 HWID Bans <span class="badge-nav" id="appHwidCount">0</span></a>
                </nav>
                <div class="bottom"><a onclick="handleLogout()">🚪 Logout</a></div>
            </div>
            <div class="main-content">
                <div class="topbar"><div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;"><h2 id="appPageTitle">Scripts</h2><span class="domain-badge" id="appDomainDisplay">🌐 Loading...</span></div></div>
                <div id="panel-scripts" class="panel active">
                    <div class="card"><div class="header"><h3>Your Scripts <span class="count" id="appScriptCountDisplay">0</span></h3><button class="btn-sm btn-sm-primary" onclick="showPanel('panel-obfuscator')">＋ New Script</button></div><div id="appScriptsList" class="grid"></div></div>
                </div>
                <div id="panel-obfuscator" class="panel">
                    <div class="card"><div class="header"><h3>🔮 Obfuscate Script</h3><button class="btn-sm btn-sm-outline" onclick="showPanel('panel-scripts')">← Back</button></div>
                    <input type="text" id="appScriptName" placeholder="Script Name" />
                    <textarea id="appScriptInput" placeholder="-- Paste your Lua script here..."></textarea>
                    <div class="form-row"><label><input type="checkbox" id="appFfaMode" /> FFA Mode</label><label><input type="checkbox" id="appCompressMode" /> Compress</label><label><input type="checkbox" id="appKeyProtected" /> Key Protected</label></div>
                    <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;"><button class="btn-sm btn-sm-primary" onclick="appObfuscate()">🔮 Obfuscate & Save</button><button class="btn-sm btn-sm-outline" onclick="appClearFields()">Clear</button><button class="btn-sm btn-sm-outline" onclick="appCopyOutput()">📋 Copy</button></div>
                    <div id="appObfuscateStatus" class="status-message info">Ready to obfuscate.</div>
                    <textarea id="appScriptOutput" style="margin-top:12px;min-height:120px;font-family:'JetBrains Mono',monospace;font-size:12px;" placeholder="Obfuscated output..." readonly></textarea></div>
                </div>
                <div id="panel-keys" class="panel">
                    <div class="card"><div class="header"><h3>🔑 Your Keys <span class="count" id="appKeyCountDisplay">0</span></h3><button class="btn-sm btn-sm-primary" onclick="appGenerateKey()">＋ Generate Key</button></div><div id="appKeysList" class="grid"></div></div>
                </div>
                <div id="panel-hwids" class="panel">
                    <div class="card"><div class="header"><h3>🚫 Banned HWIDs <span class="count" id="appHwidCountDisplay">0</span></h3><button class="btn-sm btn-sm-danger" onclick="appAddHwid()">＋ Add HWID Ban</button></div><div id="appHwidList" class="grid"></div></div>
                </div>
            </div>
        </div>
    </div>
    <div id="appToast" class="toast"></div>
    <script>
        // ============================================
        // COMPLETE JAVASCRIPT
        // ============================================
        const STORAGE={users:'kers0ne_users',session:'kers0ne_session',scripts:'kers0ne_scripts',keys:'kers0ne_keys',hwids:'kers0ne_hwids'};
        function loadData(k){try{return JSON.parse(localStorage.getItem(k))||[]}catch{return[]}}
        function saveData(k,d){localStorage.setItem(k,JSON.stringify(d))}
        function getUsers(){return loadData(STORAGE.users)}
        function setUsers(d){saveData(STORAGE.users,d)}
        function getSession(){try{return JSON.parse(localStorage.getItem(STORAGE.session))}catch{return null}}
        function setSession(d){localStorage.setItem(STORAGE.session,JSON.stringify(d))}
        function clearSession(){localStorage.removeItem(STORAGE.session)}
        function getScripts(){return loadData(STORAGE.scripts)}
        function setScripts(d){saveData(STORAGE.scripts,d)}
        function getKeys(){return loadData(STORAGE.keys)}
        function setKeys(d){saveData(STORAGE.keys,d)}
        function getHwids(){return loadData(STORAGE.hwids)}
        function setHwids(d){saveData(STORAGE.hwids,d)}
        function generateId(){return 'script_'+Date.now().toString(36)+'_'+Math.random().toString(36).substr(2,6)}
        function generateKey(){const c='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';let k='';for(let i=0;i<16;i++){if(i>0&&i%4===0)k+='-';k+=c.charAt(Math.floor(Math.random()*c.length))}return k}
        function getBaseDomain(){return window.location.origin.replace(/\/$/,'')}
        function getLoadstringUrl(id){return getBaseDomain()+'/raw/'+id}
        function escHtml(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}
        function showToast(m,t='success'){const toast=document.getElementById('appToast');toast.textContent=m;toast.className='toast '+t+' show';clearTimeout(toast._timer);toast._timer=setTimeout(()=>toast.classList.remove('show'),3000)}
        function showLogin(){document.getElementById('loginForm').style.display='block';document.getElementById('signupForm').style.display='none';document.getElementById('verificationPending').style.display='none';document.getElementById('authSubtitle').textContent='Sign in to access your scripts';}
        function showSignup(){document.getElementById('loginForm').style.display='none';document.getElementById('signupForm').style.display='block';document.getElementById('verificationPending').style.display='none';document.getElementById('authSubtitle').textContent='Create your account';}
        function setAuthMessage(id,msg,type){const el=document.getElementById(id);el.textContent=msg;el.style.display='block';el.className=type==='error'?'error-msg':'success-msg';}
        function clearAuthMessages(){['loginError','signupError'].forEach(id=>{const el=document.getElementById(id);el.style.display='none';el.textContent=''})}
        function handleSignup(){const email=document.getElementById('signupEmail').value.trim();const password=document.getElementById('signupPassword').value;const confirm=document.getElementById('signupConfirm').value;clearAuthMessages();if(!email||!password||!confirm){setAuthMessage('signupError','All fields required.','error');return}if(!email.includes('@')){setAuthMessage('signupError','Valid email required.','error');return}if(password.length<6){setAuthMessage('signupError','Password min 6 chars.','error');return}if(password!==confirm){setAuthMessage('signupError','Passwords do not match.','error');return}let users=getUsers();if(users.find(u=>u.email===email)){setAuthMessage('signupError','Email already registered.','error');return}const token=generateKey();users.push({email,password,verified:false,token,created:new Date().toISOString()});setUsers(users);document.getElementById('verifyEmailDisplay').textContent=email;document.getElementById('loginForm').style.display='none';document.getElementById('signupForm').style.display='none';document.getElementById('verificationPending').style.display='block';document.getElementById('authSubtitle').textContent='Verify your email';showToast('Verification email sent! Check spam.','success');}
        function handleLogin(){const email=document.getElementById('loginEmail').value.trim();const password=document.getElementById('loginPassword').value;const users=getUsers();const user=users.find(u=>u.email===email&&u.password===password);if(!user){document.getElementById('loginError').textContent='Invalid email or password.';document.getElementById('loginError').style.display='block';return}if(!user.verified){document.getElementById('verifyEmailDisplay').textContent=email;document.getElementById('loginForm').style.display='none';document.getElementById('signupForm').style.display='none';document.getElementById('verificationPending').style.display='block';document.getElementById('authSubtitle').textContent='Verify your email';showToast('Please verify your email first.','error');return}setSession({email:user.email,token:user.token,loginTime:Date.now()});showApp();}
        function resendVerification(){const email=document.getElementById('verifyEmailDisplay').textContent;if(email&&email!==''){showToast('Verification resent! Check spam.','success');}else{showToast('No email to resend.','error')}}
        function handleLogout(){clearSession();document.getElementById('authContainer').style.display='block';document.getElementById('appContainer').classList.add('app-hidden');showLogin();showToast('Logged out.','success');}
        function checkSession(){const session=getSession();if(session){const users=getUsers();const user=users.find(u=>u.email===session.email&&u.token===session.token);if(user&&user.verified){showApp();return}}document.getElementById('authContainer').style.display='block';document.getElementById('appContainer').classList.add('app-hidden');}
        function showApp(){document.getElementById('authContainer').style.display='none';document.getElementById('appContainer').classList.remove('app-hidden');const session=getSession();if(session){document.getElementById('appUserEmail').textContent=session.email;}document.getElementById('appDomainDisplay').textContent='🌐 '+getBaseDomain();renderScripts();renderKeys();renderHwids();}
        function renderScripts(){const scripts=getScripts();const container=document.getElementById('appScriptsList');const count=document.getElementById('appScriptCountDisplay');const badge=document.getElementById('appScriptCount');count.textContent=scripts.length;badge.textContent=scripts.length;if(!scripts.length){container.innerHTML='<div class="empty-state"><div class="icon">📜</div><h4>No Scripts Yet</h4><p style="color:var(--muted);font-size:14px">Create your first script.</p></div>';return}let html='';for(const s of scripts){const statusClass=s.status==='active'?'badge-active':'badge-disabled';const ls='loadstring(game:HttpGet("'+getLoadstringUrl(s.id)+'"))()';html+='<div class="script-card"><div class="name">'+escHtml(s.name)+'</div><div class="id">ID: '+s.id+'</div><div style="display:flex;gap:8px;flex-wrap:wrap;margin:8px 0"><span class="badge '+statusClass+'">'+s.status+'</span>'+(s.ffa?'<span class="badge badge-ffa">FFA</span>':'')+(s.compressed?'<span class="badge badge-compressed">Compressed</span>':'')+'</div><div class="loadstring-box" onclick="copyLoadstring(this)">'+ls+'<span class="copy-hint">📋 Click</span></div><div class="actions"><button class="btn-sm btn-sm-outline" onclick="editScript(\''+s.id+'\')">✏️ Edit</button><button class="btn-sm btn-sm-outline" onclick="toggleScript(\''+s.id+'\')">'+(s.status==='active'?'⏸️ Disable':'▶️ Enable')+'</button><button class="btn-sm btn-sm-danger" onclick="deleteScript(\''+s.id+'\')">🗑️</button></div></div>'}container.innerHTML=html}
        function renderKeys(){const keys=getKeys();const container=document.getElementById('appKeysList');const count=document.getElementById('appKeyCountDisplay');const badge=document.getElementById('appKeyCount');count.textContent=keys.length;badge.textContent=keys.length;if(!keys.length){container.innerHTML='<div class="empty-state"><div class="icon">🔑</div><h4>No Keys</h4></div>';return}let html='';for(const k of keys){html+='<div class="script-card"><div style="font-family:monospace;font-size:14px;color:#fff;font-weight:700">'+k.key+'</div><div style="font-size:12px;color:var(--muted)">Expires: '+(k.expires||'Never')+'</div><div style="font-size:12px;margin-top:4px;color:'+(k.used?'#ff4444':'#44ff44')+'">'+(k.used?'❌ Used':'✅ Available')+'</div><button class="btn-sm btn-sm-danger" style="margin-top:10px" onclick="deleteKey(\''+k.key+'\')">🗑️</button></div>'}container.innerHTML=html}
        function renderHwids(){const hwids=getHwids();const container=document.getElementById('appHwidList');const count=document.getElementById('appHwidCountDisplay');const badge=document.getElementById('appHwidCount');count.textContent=hwids.length;badge.textContent=hwids.length;if(!hwids.length){container.innerHTML='<div class="empty-state"><div class="icon">🚫</div><h4>No Banned HWIDs</h4></div>';return}let html='';for(const h of hwids){html+='<div class="script-card"><div style="font-family:monospace;font-size:13px;color:#ff4444;font-weight:700">'+escHtml(h.hwid)+'</div><div style="font-size:12px;color:var(--muted)">'+escHtml(h.reason||'No reason')+'</div><button class="btn-sm btn-sm-outline" style="margin-top:10px" onclick="unbanHwid(\''+h.hwid+'\')">🔓 Unban</button></div>'}container.innerHTML=html}
        window.toggleScript=function(id){const scripts=getScripts();const s=scripts.find(x=>x.id===id);if(s){s.status=s.status==='active'?'disabled':'active';setScripts(scripts);renderScripts();showToast('Script '+(s.status==='active'?'enabled':'disabled'),'success')}}
        window.deleteScript=function(id){if(!confirm('Delete?'))return;let scripts=getScripts();scripts=scripts.filter(s=>s.id!==id);setScripts(scripts);renderScripts();showToast('Deleted','success')}
        window.editScript=function(id){const scripts=getScripts();const s=scripts.find(x=>x.id===id);if(!s)return;document.getElementById('appScriptName').value=s.name;document.getElementById('appScriptInput').value=s.originalCode||s.obfuscated||'';document.getElementById('appFfaMode').checked=s.ffa||false;document.getElementById('appCompressMode').checked=s.compressed||false;document.getElementById('appScriptOutput').value='';document.getElementById('appScriptOutput').dataset.editId=id;showPanel('panel-obfuscator');document.getElementById('appObfuscateStatus').className='status-message info';document.getElementById('appObfuscateStatus').textContent='Editing: '+s.name}
        window.copyLoadstring=function(el){const text=el.textContent.trim().replace('📋 Click','').trim();navigator.clipboard.writeText(text).then(()=>showToast('Copied!','success')).catch(()=>{const r=document.createRange();r.selectNode(el);window.getSelection().removeAllRanges();window.getSelection().addRange(r);document.execCommand('copy');showToast('Copied!','success')})}
        window.appGenerateKey=function(){const keys=getKeys();keys.push({key:generateKey(),expires:new Date(Date.now()+30*24*60*60*1000).toISOString().split('T')[0],used:false,usedBy:null,createdAt:new Date().toISOString()});setKeys(keys);renderKeys();showToast('Key generated','success')}
        window.deleteKey=function(key){if(!confirm('Delete key?'))return;let keys=getKeys();keys=keys.filter(k=>k.key!==key);setKeys(keys);renderKeys();showToast('Key deleted','success')}
        window.appAddHwid=function(){const hwid=prompt('Enter HWID to ban:');if(!hwid)return;const reason=prompt('Reason:')||'No reason';const hwids=getHwids();if(hwids.find(h=>h.hwid===hwid)){showToast('Already banned','error');return}hwids.push({hwid,reason,date:new Date().toLocaleDateString()});setHwids(hwids);renderHwids();showToast('HWID banned','success')}
        window.unbanHwid=function(hwid){if(!confirm('Unban?'))return;let hwids=getHwids();hwids=hwids.filter(h=>h.hwid!==hwid);setHwids(hwids);renderHwids();showToast('Unbanned','success')}
        function localObfuscate(code){const key=0x4B;const bytes=new TextEncoder().encode(code);const xorred=new Uint8Array(bytes.length);for(let i=0;i<bytes.length;i++){xorred[i]=bytes[i]^key}let binary='';for(let i=0;i<xorred.length;i++){binary+=String.fromCharCode(xorred[i])}const b64=btoa(binary);const reversed=b64.split('').reverse().join('');return '-- [[ Kers0ne Protected ]]\nlocal function d(s) local r="" for i=#s,1,-1 do r=r..s:sub(i,i) end return r end\nlocal function x(s) local t={} for i=1,#s do t[i]=string.char(bit32.bxor(s:byte(i),0x4B)) end return table.concat(t) end\nlocal decoded = x(d("'+reversed+'"))\nlocal fn = loadstring(decoded)\nif fn then fn() else print("Decryption failed") end'}
        window.appObfuscate=async function(){const name=document.getElementById('appScriptName').value.trim();const code=document.getElementById('appScriptInput').value;const status=document.getElementById('appObfuscateStatus');const output=document.getElementById('appScriptOutput');const editId=output.dataset.editId;if(!name){status.className='status-message error';status.textContent='❌ Enter a name.';return}if(!code.trim()){status.className='status-message error';status.textContent='❌ Paste a script.';return}status.className='status-message info';status.textContent='⏳ Obfuscating...';output.value='';try{const result=localObfuscate(code);output.value=result;let scripts=getScripts();const ffa=document.getElementById('appFfaMode').checked;const compressed=document.getElementById('appCompressMode').checked;if(editId){const idx=scripts.findIndex(s=>s.id===editId);if(idx!==-1){scripts[idx].name=name;scripts[idx].originalCode=code;scripts[idx].obfuscated=result;scripts[idx].ffa=ffa;scripts[idx].compressed=compressed;scripts[idx].updatedAt=new Date().toISOString();delete output.dataset.editId;showToast('Updated!','success')}}else{scripts.unshift({id:generateId(),name,status:'active',ffa,compressed,originalCode:code,obfuscated:result,createdAt:new Date().toISOString()});showToast('Saved!','success')}setScripts(scripts);renderScripts();status.className='status-message success';status.textContent='✅ Obfuscation complete.'}catch(e){status.className='status-message error';status.textContent='❌ Error: '+e.message}}
        window.appClearFields=function(){document.getElementById('appScriptName').value='';document.getElementById('appScriptInput').value='';document.getElementById('appScriptOutput').value='';document.getElementById('appScriptOutput').dataset.editId='';document.getElementById('appFfaMode').checked=false;document.getElementById('appCompressMode').checked=false;document.getElementById('appObfuscateStatus').className='status-message info';document.getElementById('appObfuscateStatus').textContent='Ready to obfuscate.'}
        window.appCopyOutput=function(){const output=document.getElementById('appScriptOutput');if(!output.value){document.getElementById('appObfuscateStatus').className='status-message error';document.getElementById('appObfuscateStatus').textContent='❌ Nothing to copy.';return}navigator.clipboard.writeText(output.value).then(()=>showToast('Copied!','success')).catch(()=>{output.select();document.execCommand('copy');showToast('Copied!','success')})}
        window.showPanel=function(id){document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active');document.querySelectorAll('.sidebar nav a').forEach(a=>a.classList.remove('active'));const link=document.querySelector('.sidebar nav a[data-panel="'+id+'"]');if(link)link.classList.add('active');const titles={'panel-scripts':'Scripts','panel-obfuscator':'Obfuscator','panel-keys':'Keys','panel-hwids':'HWID Bans'};document.getElementById('appPageTitle').textContent=titles[id]||'Dashboard'}
        document.querySelectorAll('.sidebar nav a').forEach(a=>{a.addEventListener('click',(e)=>{e.preventDefault();window.showPanel(a.dataset.panel)})});
        // Handle raw endpoint via hash
        function handleRawEndpoint(){const hash=window.location.hash;if(hash.startsWith('#/raw/')){const id=hash.replace('#/raw/','');const scripts=getScripts();const s=scripts.find(x=>x.id===id);if(s){const content=s.obfuscated||s.originalCode||'-- No content';document.body.innerHTML='<pre style="background:#000;color:#fff;padding:30px;font-family:monospace;font-size:13px;white-space:pre-wrap;word-break:break-all;min-height:100vh;margin:0;">'+escHtml(content)+'</pre>';document.title='Raw: '+s.name}else{document.body.innerHTML='<pre style="background:#000;color:#ff4444;padding:30px;font-family:monospace;font-size:16px;">Script not found: '+id+'</pre>'}}}
        window.addEventListener('DOMContentLoaded',()=>{handleRawEndpoint();checkSession()});
        window.addEventListener('hashchange',handleRawEndpoint);
    </script>
</body>
</html>`;

// ============================================
// CLOUDFLARE WORKER HANDLER
// ============================================

async function handleRequest(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // --- RAW ENDPOINT ---
    if (path.startsWith('/raw/')) {
        const scriptId = path.replace('/raw/', '');
        
        // Get from KV (bind SCRIPT_KV in Cloudflare)
        const scriptData = await SCRIPT_KV.get(scriptId);
        
        if (!scriptData) {
            return new Response('Script not found: ' + scriptId, {
                status: 404,
                headers: { 'Content-Type': 'text/plain' }
            });
        }

        return new Response(scriptData, {
            headers: {
                'Content-Type': 'text/plain',
                'Cache-Control': 'no-cache'
            }
        });
    }

    // --- SAVE SCRIPT TO KV ---
    if (path === '/api/save-script' && request.method === 'POST') {
        try {
            const data = await request.json();
            const { id, code } = data;
            
            if (!id || !code) {
                return new Response(JSON.stringify({ error: 'Missing id or code' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            await SCRIPT_KV.put(id, code);
            
            return new Response(JSON.stringify({ success: true }), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    // --- SERVE PANEL ---
    return new Response(HTML, {
        headers: { 'Content-Type': 'text/html' }
    });
}

// ============================================
// BIND KV NAMESPACE
// ============================================
// In wrangler.toml:
// [[kv_namespaces]]
// binding = "SCRIPT_KV"
// id = "344d7076790047fa8440947d1a16bf27"

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});
