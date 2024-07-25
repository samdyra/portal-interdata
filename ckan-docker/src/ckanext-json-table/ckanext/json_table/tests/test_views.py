"""Tests for views.py."""

import pytest

import ckanext.json_table.validators as validators


import ckan.plugins.toolkit as tk


@pytest.mark.ckan_config("ckan.plugins", "json_table")
@pytest.mark.usefixtures("with_plugins")
def test_json_table_blueprint(app, reset_db):
    resp = app.get(tk.h.url_for("json_table.page"))
    assert resp.status_code == 200
    assert resp.body == "Hello, json_table!"
