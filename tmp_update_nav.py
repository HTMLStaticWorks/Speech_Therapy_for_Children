import os
import re

files = [
    'index.html', 'home-2.html', 'about.html', 'services.html', 
    'resources.html', 'progress.html', 'contact.html', 
    'login.html', 'register.html', '404.html', 'coming-soon.html',
    'service-details.html'
]

def update_nav(file_path):
    if not os.path.exists(file_path):
        print(f"Skipping {file_path} (not found)")
        return
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Desktop Navbar: Add Dashboards after Contact
    # We target the main navbar-nav inside navbar-collapse
    main_nav_match = re.search(r'<div class="collapse navbar-collapse".*?<ul class="navbar-nav mx-auto">(.*?)</ul>', content, re.DOTALL)
    if main_nav_match:
        nav_list = main_nav_match.group(1)
        if 'dashboard.html' not in nav_list:
            contact_item = re.search(r'<li class="nav-item"><a class="nav-link.*?" href="contact\.html">Contact</a></li>', nav_list)
            if contact_item:
                new_items = contact_item.group(0) + \
                            '\n                    <li class="nav-item"><a class="nav-link" href="dashboard.html?role=admin">Admin Dashboard</a></li>' + \
                            '\n                    <li class="nav-item"><a class="nav-link" href="dashboard.html?role=parent">Parent Dashboard</a></li>'
                new_nav_list = nav_list.replace(contact_item.group(0), new_items)
                content = content.replace(nav_list, new_nav_list)

    # 2. Mobile Menu (Offcanvas)
    offcanvas_match = re.search(r'id="mobileMenu".*?<div class="offcanvas-body">(.*?)</div>\s*</div>', content, re.DOTALL)
    if offcanvas_match:
        off_body = offcanvas_match.group(1)
        new_off_body = off_body
        
        # a) Separate Home 1 and Home 2
        home_dropdown = re.search(r'<li class="nav-item">\s*<div class="dropdown">.*?Home.*?<ul class="dropdown-menu">.*?</ul>\s*</div>\s*</li>', new_off_body, re.DOTALL)
        if home_dropdown:
            home_sep = '<li class="nav-item"><a class="nav-link" href="index.html">Home 1</a></li>\n                <li class="nav-item"><a class="nav-link" href="home-2.html">Home 2</a></li>'
            new_off_body = new_off_body.replace(home_dropdown.group(0), home_sep)
            
        # b) Remove any existing dashboard links in offcanvas to avoid duplicates
        new_off_body = re.sub(r'<li class="nav-item">\s*<a class="nav-link[^"]*" href="dashboard\.html\?role=(admin|parent)">.*?</a>\s*</li>', '', new_off_body, flags=re.DOTALL)
        
        # c) Insert new dashboard links after Contact
        contact_mobile = re.search(r'<li class="nav-item"><a class="nav-link.*?" href="contact\.html">Contact</a></li>', new_off_body)
        if contact_mobile:
            mobile_items = contact_mobile.group(0) + \
                           '\n                <li class="nav-item"><a class="nav-link" href="dashboard.html?role=admin">Admin Dashboard</a></li>' + \
                           '\n                <li class="nav-item"><a class="nav-link" href="dashboard.html?role=parent">Parent Dashboard</a></li>'
            new_off_body = new_off_body.replace(contact_mobile.group(0), mobile_items)
            
        content = content.replace(off_body, new_off_body)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {file_path}")

for f in files:
    update_nav(f)
