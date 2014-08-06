mithril.templates
=================

The templating system brings together the ability to add templates in the controller, inside the dom or loaded via ajax - all able to be nested.

### In-controller template

    this.tmpl = function(data){
        with(m.sugarTags) {
            return DIV("This is my template")
        };
    };

To use it, you can call the template function

    m.template(data.tmpl, data)

### Defined template

*Note:* this type of template is more efficient compared to In-dom templates, though a little more terse, as it does not automatically include sugar tags, etc.

    <script>
        m.template.define('list', function(data){
            with(m.sugarTags) {
                return DIV("This is my template");
            }
        });
    </script>

To use it, you render it - by using the defined key (in this case 'list')

    m.template.render('list', data)

### In-dom template

*Note:* this type of template is quite convenient, but not especially efficient as it needs to parse the text into code.
*Note:* you must set the type as "text/mithrill" for it to work correcty, otherwise the browser will try to execute it

    <script id="tmpl" type="text/mithrill">
        DIV("This is my template")
    </script>

To use it, you refer to it by ID (in this case 'tmpl')

    m.template('tmpl', data)

### Ajax loaded templates

*Note:* there are two steps to use ajax loaded templates

A. Setup remote loading for template in the controller

    this.tmpl = m.template.load("tmpl.js");

B. Use it from within another template

    m.template(data.inputTmpl(), data)

