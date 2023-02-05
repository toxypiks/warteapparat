from distutils.core import setup
setup(
    name = 'warteapparat',
    packages = ['warteapparat'],
    version = '0.2',
    license = 'GPL v3',
    description = 'pizza waiting line app',
    url = 'https://github.com/toxypiks/warteapparat',
    install_requires=[
        'Flask',
        'Flask-Cors',
        'itsdangerous'
    ],  
    entry_points = {
        'console_scripts': ['warteapparat = warteapparat.flask_backend:main',],
    },
    scripts=['scripts/warteapparat'],
    keywords = ['waiting line'],

    classifiers = [
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.10',
    ],
)

