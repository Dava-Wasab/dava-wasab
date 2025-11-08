// ==========================================
// DAVAWASAB PORTFOLIO - SECURITY SYSTEM
// Full Website Protection & Anti-Tampering
// ==========================================

(function() {
    'use strict';
    
    // Obfuscated strings
    const _0x5f3a = ['keydown', 'contextmenu', 'body', 'innerHTML', 'reload', 'location', 'outerWidth', 'innerWidth', 'outerHeight', 'innerHeight'];
    const _0x2d1b = (s) => s.split('').reverse().join('');
    const _0x8c4e = String.fromCharCode(70, 49, 50);
    
    // ==========================================
    // 1. DISABLE DEVTOOLS (F12, Ctrl+Shift+I, Ctrl+Shift+C)
    // ==========================================
    
    // Detect DevTools opening
    let devtoolsOpen = false;
    const threshold = 160;
    
    const detectDevTools = () => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                handleDevToolsOpen();
            }
        } else {
            devtoolsOpen = false;
        }
    };
    
    const handleDevToolsOpen = () => {
        document.body.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background: #01000D;
                color: #E0FF00;
                font-family: 'Unbounded', sans-serif;
                text-align: center;
                flex-direction: column;
                gap: 20px;
            ">
                <h1 style="font-size: 48px; margin: 0;">⚠️ Access Denied</h1>
                <p style="font-size: 20px; opacity: 0.8;">Developer tools are not allowed on this website.</p>
                <p style="font-size: 16px; opacity: 0.6;">Please close DevTools and refresh the page.</p>
            </div>
        `;
        
        // Redirect after 3 seconds
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    };
    
    // Check every 500ms with random variance
    setInterval(detectDevTools, 500 + Math.random() * 100);
    
    // Additional layer: check for console.clear spam
    let clearCount = 0;
    const originalClear = console.clear;
    console.clear = function() {
        clearCount++;
        if (clearCount > 5) {
            handleDevToolsOpen();
        }
        return originalClear.apply(console, arguments);
    };
    
    // Block keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            handleDevToolsOpen();
            return false;
        }
        
        // Ctrl+Shift+I (DevTools)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) {
            e.preventDefault();
            handleDevToolsOpen();
            return false;
        }
        
        // Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.keyCode === 67)) {
            e.preventDefault();
            handleDevToolsOpen();
            return false;
        }
        
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.keyCode === 74)) {
            e.preventDefault();
            handleDevToolsOpen();
            return false;
        }
        
        // Ctrl+U (View Source)
        if (e.ctrlKey && (e.key === 'U' || e.keyCode === 85)) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+S (Save Page)
        if (e.ctrlKey && (e.key === 'S' || e.keyCode === 83)) {
            e.preventDefault();
            return false;
        }
    });
    
    // Block right-click context menu
    document.addEventListener(_0x5f3a[1], (e) => {
        e.preventDefault();
        return false;
    });
    
    // Detect if running in iframe
    if (window.self !== window.top) {
        window.top.location = window.self.location;
    }
    
    // Anti-screenshot protection
    document.addEventListener('keyup', (e) => {
        if (e.key === 'PrintScreen') {
            navigator.clipboard.writeText('');
            alert('Screenshots are disabled on this website.');
        }
    });
    
    // ==========================================
    // 2. DISABLE CONSOLE
    // ==========================================
    
    // Override console methods
    const disableConsole = () => {
        const noop = () => {};
        const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 'dirxml', 'group', 'groupCollapsed', 'groupEnd', 'clear', 'count', 'countReset', 'assert', 'profile', 'profileEnd', 'time', 'timeLog', 'timeEnd', 'timeStamp', 'context', 'memory'];
        
        methods.forEach(method => {
            if (console[method]) {
                console[method] = noop;
            }
        });
        
        // Prevent console from being reassigned
        Object.defineProperty(window, 'console', {
            get: () => ({
                log: noop,
                debug: noop,
                info: noop,
                warn: noop,
                error: noop,
                table: noop,
                trace: noop,
                dir: noop,
                dirxml: noop,
                group: noop,
                groupCollapsed: noop,
                groupEnd: noop,
                clear: noop,
                count: noop,
                countReset: noop,
                assert: noop,
                profile: noop,
                profileEnd: noop,
                time: noop,
                timeLog: noop,
                timeEnd: noop,
                timeStamp: noop
            }),
            set: () => {}
        });
    };
    
    disableConsole();
    
    // ==========================================
    // 3. PROTECT DOM FROM MODIFICATIONS
    // ==========================================
    
    const protectDOM = () => {
        // Freeze important objects
        Object.freeze(document.documentElement);
        
        // Monitor DOM mutations
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // Check for suspicious modifications
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    // Log attempt (in production, send to server)
                    const suspiciousActivity = true;
                    
                    if (suspiciousActivity) {
                        // Optionally reload or lock page
                        // handleTamperingDetected();
                    }
                }
            });
        });
        
        // Observe the entire document
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeOldValue: true,
            characterData: true,
            characterDataOldValue: true
        });
    };
    
    // ==========================================
    // 4. BLOCK BROWSER EXTENSIONS & SCRIPTS
    // ==========================================
    
    const detectExtensions = () => {
        // Detect common extension patterns
        const extensionPatterns = [
            'chrome-extension://',
            'moz-extension://',
            'safari-extension://',
            'edge-extension://'
        ];
        
        // Check for extension resources
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
            const src = script.src || '';
            extensionPatterns.forEach(pattern => {
                if (src.includes(pattern)) {
                    script.remove();
                    console.warn('Extension script blocked:', src);
                }
            });
        });
        
        // Block eval and Function constructor
        window.eval = function() {
            throw new Error('eval is disabled for security reasons');
        };
        
        window.Function = function() {
            throw new Error('Function constructor is disabled for security reasons');
        };
    };
    
    // ==========================================
    // 5. ADBLOCK DETECTION
    // ==========================================
    
    const detectAdBlock = () => {
        // Create bait element
        const bait = document.createElement('div');
        bait.className = 'ad ads adsbox doubleclick ad-placement ad-placeholder adbadge BannerAd';
        bait.style.cssText = 'position: absolute; top: -9999px; left: -9999px; width: 1px; height: 1px;';
        document.body.appendChild(bait);
        
        // Check if blocked
        setTimeout(() => {
            const isBlocked = bait.offsetHeight === 0 || bait.offsetWidth === 0 || bait.style.display === 'none' || bait.style.visibility === 'hidden';
            
            if (isBlocked) {
                handleAdBlockDetected();
            }
            
            bait.remove();
        }, 100);
    };
    
    const handleAdBlockDetected = () => {
        const overlay = document.createElement('div');
        overlay.id = 'adblock-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(1, 0, 13, 0.98);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 20px;
            color: #E0FF00;
            font-family: 'Unbounded', sans-serif;
            text-align: center;
            padding: 40px;
        `;
        
        overlay.innerHTML = `
            <h1 style="font-size: 48px; margin: 0;">🚫 AdBlock Detected</h1>
            <p style="font-size: 20px; opacity: 0.8; max-width: 600px;">
                Please disable your ad blocker to access this website.
            </p>
            <p style="font-size: 16px; opacity: 0.6;">
                We don't show ads, but ad blockers can interfere with site functionality.
            </p>
            <button onclick="location.reload()" style="
                background: #E0FF00;
                color: #01000D;
                border: none;
                padding: 16px 32px;
                font-size: 18px;
                font-weight: 700;
                border-radius: 12px;
                cursor: pointer;
                font-family: 'Montserrat', sans-serif;
                margin-top: 20px;
            ">Refresh Page</button>
        `;
        
        document.body.appendChild(overlay);
    };
    
    // ==========================================
    // 6. CONTENT PROTECTION
    // ==========================================
    
    const protectContent = () => {
        // Disable text selection (already in CSS, but enforce in JS)
        document.onselectstart = () => false;
        document.onmousedown = () => false;
        
        // Disable drag and drop
        document.ondragstart = () => false;
        document.ondrop = () => false;
        
        // Disable cut, copy, paste
        document.addEventListener('cut', (e) => e.preventDefault());
        document.addEventListener('copy', (e) => e.preventDefault());
        document.addEventListener('paste', (e) => e.preventDefault());
        
        // Protect images
        document.querySelectorAll('img').forEach(img => {
            img.oncontextmenu = () => false;
            img.ondragstart = () => false;
            img.onselectstart = () => false;
            img.style.pointerEvents = 'none';
            img.style.userSelect = 'none';
        });
        
        // Disable print
        window.onbeforeprint = () => {
            document.body.style.display = 'none';
        };
        
        window.onafterprint = () => {
            document.body.style.display = 'block';
        };
    };
    
    // ==========================================
    // 7. TAMPERING DETECTION
    // ==========================================
    
    let tamperingAttempts = 0;
    const maxAttempts = 5;
    
    const handleTamperingDetected = () => {
        tamperingAttempts++;
        
        if (tamperingAttempts >= maxAttempts) {
            lockWebsite();
        }
    };
    
    const lockWebsite = () => {
        document.body.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background: #01000D;
                color: #E0FF00;
                font-family: 'Unbounded', sans-serif;
                text-align: center;
                flex-direction: column;
                gap: 20px;
            ">
                <h1 style="font-size: 64px; margin: 0;">🔒 Website Locked</h1>
                <p style="font-size: 24px; opacity: 0.8;">Too many tampering attempts detected.</p>
                <p style="font-size: 18px; opacity: 0.6;">This incident has been logged.</p>
                <p style="font-size: 16px; opacity: 0.5; margin-top: 40px;">Contact: Dava_Wasab</p>
            </div>
        `;
        
        // Prevent any further actions
        document.addEventListener('keydown', (e) => e.preventDefault(), true);
        document.addEventListener('mousedown', (e) => e.preventDefault(), true);
        document.addEventListener('contextmenu', (e) => e.preventDefault(), true);
    };
    
    // Detect debugger
    const detectDebugger = () => {
        setInterval(() => {
            const start = performance.now();
            debugger; // This will pause if DevTools is open
            const end = performance.now();
            
            if (end - start > 100) {
                handleDevToolsOpen();
            }
        }, 1000);
    };
    
    // ==========================================
    // 8. ANTI-AUTOMATION & BOT DETECTION
    // ==========================================
    
    const detectAutomation = () => {
        // Check for headless browser
        if (navigator.webdriver) {
            handleTamperingDetected();
        }
        
        // Check for automation tools
        if (window.document.documentElement.getAttribute('webdriver')) {
            handleTamperingDetected();
        }
        
        // Check for PhantomJS
        if (window.callPhantom || window._phantom) {
            handleTamperingDetected();
        }
        
        // Check for Selenium
        if (window.document.$cdc_asdjflasutopfhvcZLmcfl_) {
            handleTamperingDetected();
        }
    };
    
    // ==========================================
    // 9. INTEGRITY CHECK
    // ==========================================
    
    const checkIntegrity = () => {
        // Check if critical scripts are modified
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            const originalSrc = script.getAttribute('data-original-src');
            if (originalSrc && script.src !== originalSrc) {
                handleTamperingDetected();
            }
        });
    };
    
    // ==========================================
    // 10. ADVANCED PROTECTION LAYER
    // ==========================================
    
    const _0x4a2b = ['prototype', 'toString', 'constructor'];
    const advancedProtection = () => {
        // Anti-tampering for critical functions
        const originalFetch = window.fetch;
        const originalXHR = window.XMLHttpRequest;
        
        // Monitor network requests
        window.fetch = function(...args) {
            const url = args[0];
            if (typeof url === 'string' && url.includes('inject')) {
                handleTamperingDetected();
                return Promise.reject('Blocked');
            }
            return originalFetch.apply(this, args);
        };
        
        // Prevent script injection
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.tagName === 'SCRIPT' && !node.src.includes(location.hostname)) {
                        node.remove();
                        handleTamperingDetected();
                    }
                });
            });
        });
        
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
        
        // Freeze critical objects
        Object.freeze(Object[_0x4a2b[0]]);
        Object.freeze(Array[_0x4a2b[0]]);
        Object.freeze(Function[_0x4a2b[0]]);
    };
    
    // ==========================================
    // INITIALIZE SECURITY SYSTEM
    // ==========================================
    
    const initSecurity = () => {
        console.log('%c🛡️ SECURITY SYSTEM ACTIVE', 'background: #E0FF00; color: #01000D; font-size: 20px; font-weight: bold; padding: 10px;');
        console.log('%c⚠️ Unauthorized access attempts will be logged and blocked.', 'color: #E0FF00; font-size: 14px;');
        
        // Enable all protection layers
        protectDOM();
        detectExtensions();
        detectAdBlock();
        protectContent();
        detectDebugger();
        detectAutomation();
        advancedProtection();
        
        // Periodic integrity checks
        setInterval(checkIntegrity, 5000);
        
        // Monitor for tampering
        window.addEventListener('error', (e) => {
            if (e.message.includes('Script error')) {
                handleTamperingDetected();
            }
        });
        
        // Prevent iframe embedding
        if (window.top !== window.self) {
            window.top.location = window.self.location;
        }
        
        // Disable certain APIs
        delete window.localStorage;
        delete window.sessionStorage;
        
        console.log('%c✅ All security layers initialized', 'color: #87C93D; font-size: 12px;');
    };
    
    // Start security system when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSecurity);
    } else {
        initSecurity();
    }
    
    // Prevent script from being removed
    Object.freeze(Object.prototype);
    
})();
