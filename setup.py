#!/usr/bin/env python

import os

from setuptools import setup, find_packages

try:
    # Workaround for http://bugs.python.org/issue15881
    import multiprocessing
except ImportError:
    pass

if __name__ == '__main__':
    setup(
        name = 'dictyExpress',
        
        description = "Frontend of dicty express application.",
        long_description = open(os.path.join(os.path.dirname(__file__), 'README.rst')).read(),
        
        
        
        
        packages = find_packages(exclude=('*.tests', '*.tests.*', 'tests.*', 'tests')),
        package_data = {},
        classifiers = [

            'Environment :: Web Environment',


            'Operating System :: OS Independent',
            'Programming Language :: Python',
            'Framework :: Django',
        ],
        include_package_data = True,
        zip_safe = False,
        install_requires = [
            'Django>=1.4',




        ],

    )
