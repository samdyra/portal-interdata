import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
import ckanext.json_table.views as views
import requests

class JsonTablePlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IResourceView)
    plugins.implements(plugins.IBlueprint)
    
    # IConfigurer
    def update_config(self, config_):
        toolkit.add_template_directory(config_, "templates")
        toolkit.add_public_directory(config_, "public")
        toolkit.add_resource("assets", "json_table")

    # IResourceView
    def info(self):
        return {
            'name': 'json_table',
            'title': 'JSON Table View',
            'icon': 'table',
            'iframed': False,
            'default_title': 'JSON Table View',
        }

    def can_view(self, data_dict):
        resource = data_dict['resource']
        if resource['format'].lower() == 'json':
            return True
        return False

    def view_template(self, context, data_dict):
        return 'json_table/json_table_view.html'

    def form_template(self, context, data_dict):
        return 'json_table/json_table_form.html'

    def setup_template_variables(self, context, data_dict):
        resource = data_dict['resource']
        resource_url = resource['url']
        try:
            response = requests.get(resource_url)
            data = response.json()
            return {'response': data}
        except Exception as e:
            toolkit.h.flash_error(str(e))
            return {'response': []}
    # IBlueprint
    def get_blueprint(self):
        return views.get_blueprints()
