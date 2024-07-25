from flask import Blueprint, render_template, abort
import json
import ckan.plugins.toolkit as toolkit
import ckan.lib.uploader as uploader

json_table = Blueprint("json_table", __name__, template_folder="templates")

def json_table_view(resource_id):
    # Fetch the resource data from CKAN
    context = {'model': toolkit.model, 'user': toolkit.c.user}
    data_dict = {'id': resource_id}

    try:
        resource = toolkit.get_action('resource_show')(context, data_dict)
    except toolkit.ObjectNotFound:
        return toolkit.abort(404, 'Resource not found')
    except toolkit.NotAuthorized:
        return toolkit.abort(403, 'Unauthorized to view this resource')

    # Load the JSON data from the file
    json_data = []
    upload = uploader.get_resource_uploader(resource)
    file_path = upload.get_path(resource['id'])
    try:
        with open(file_path, 'r') as json_file:
            json_data = json.load(json_file)
    except Exception as e:
        return toolkit.abort(400, f'Error reading JSON data: {e}')

    # Pass parsed JSON data to the template
    return render_template('json_table/json_table_view.html', data=json_data)

json_table.add_url_rule('/dataset/<resource_id>/json_table', view_func=json_table_view)

def get_blueprints():
    return [json_table]
